import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import {
    CreateCellActionType, FocusCellActionType, ICreateCellActionType, IFocusCellActionType
} from '../App';
import { getCurrentCellIndex, getOffSetToTheEnd, getOffSetToTheStart } from '../utils';

const Cell: React.FC<ICell> = ({
  children,
  focusState,
  floatingToolBoxRef,
  createCellDispatch,
  dispatchFocusState,
}) => {
  const creatorRef = useRef<any>(null);

  useEffect(() => {
    const creatorBox = creatorRef.current!;
    const parent = creatorBox.parentElement?.children;
    const childToFocus = parent[focusState];
    childToFocus?.focus();

    if (childToFocus) {
      const selectRange = document.createRange();
      selectRange.selectNodeContents(childToFocus);

      document.getSelection()?.removeAllRanges();
      const selection = document.getSelection();
      selection?.addRange(selectRange);
      selection?.collapseToEnd();
    }
  }, [focusState]);

  useEffect(() => {
    const creatorBox = creatorRef.current!;
    const keyPressEvent = (event: any) => {
      if (
        event.key === 'Backspace' &&
        getOffSetToTheStart(creatorBox) === 0 &&
        getOffSetToTheEnd(creatorBox) === 0
      ) {
        createCellDispatch({
          type: CreateCellActionType.REMOVECELL,
          payload: { index: getCurrentCellIndex(creatorRef.current!) },
        });
        dispatchFocusState({
          type: FocusCellActionType.FOCUSPREVCELL,
          payload: getCurrentCellIndex(creatorRef.current!),
        });
      } else if (event.key === 'Enter' && event.shiftKey) {
        document.execCommand('insertLineBreak'); // No good replacement yet
        event.preventDefault();
      } else if (event.key === 'Enter' && getOffSetToTheEnd(creatorBox) === 0) {
        event.preventDefault();
        createCellDispatch({
          type: CreateCellActionType.ADDCELL,
          payload: { index: getCurrentCellIndex(creatorRef.current!) },
        });
        dispatchFocusState({
          type: FocusCellActionType.FOCUSNEXTCELL,
          payload: getCurrentCellIndex(creatorRef.current!),
        });
      } else if (event.key === 'Enter') {
        document.execCommand('insertLineBreak'); // No good replacement yet
        event.preventDefault();
      }
    };
    creatorBox.addEventListener('keydown', keyPressEvent);

    return () => creatorBox.removeEventListener('keydown', keyPressEvent);
  }, [createCellDispatch, dispatchFocusState]);

  const focusOnCellClickHandler = () => {
    dispatchFocusState({
      type: FocusCellActionType.FOCUSCLICKEDCELL,
      payload: getCurrentCellIndex(creatorRef.current!),
    });
  };

  const onFloatingToolBarHandler = (event: any) => {
    const floatingToolBox = floatingToolBoxRef.current!;
    const floatingToolBoxHeight = Number(
      getComputedStyle(floatingToolBox).height.slice(0, -2)
    );
    const floatingToolBoxWidth = Number(
      getComputedStyle(floatingToolBox).width.slice(0, -2)
    );

    const getSelection = document.getSelection();
    const selectedString = getSelection?.toString();
    const selectionX = Number(
      getSelection?.getRangeAt(0).getBoundingClientRect().x
    );

    const selectionWidth = Number(
      getSelection?.getRangeAt(0).getBoundingClientRect().width
    );

    const cursorX = `${
      selectionX + selectionWidth / 2 - floatingToolBoxWidth / 2
    }px`;
    const cursorY = `${event.pageY - floatingToolBoxHeight - 20}px`;

    if (selectedString?.trim().length !== 0) {
      floatingToolBox.style.top = cursorY;
      floatingToolBox.style.left = cursorX;

      console.log('SELECTED STRING', selectedString);
    }
  };

  return (
    <Creator
      ref={creatorRef}
      contentEditable
      suppressContentEditableWarning={true}
      onClick={focusOnCellClickHandler}
      onMouseUp={onFloatingToolBarHandler}
    >
      {children}
    </Creator>
  );
};

export default Cell;

// === interface
interface ICell {
  children?: any;
  focusState: any;
  floatingToolBoxRef?: any;
  createCellDispatch: React.Dispatch<ICreateCellActionType>;
  dispatchFocusState: React.Dispatch<IFocusCellActionType>;
}

// === style
const Creator = styled.p`
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
  display: inline-block;
  margin: 0px;
  //TODO:: Remove line below used for debugging
  & * {
    border: 1px solid salmon;
  }
`;
