import { useReducer, useRef } from 'react';

import BlogContentList from './components/BlogContentList';
import Cell from './components/Cell';
import FloatingToolBox from './components/FloatingToolBox';
import ToolBox from './components/ToolBox';
import { generateRandId } from './utils';

const initialState = [
  {
    id: generateRandId(),
  },
];

export enum CreateCellActionType {
  ADDCELL = 'addCell',
  REMOVECELL = 'removeCell',
}

export enum FocusCellActionType {
  FOCUSNEXTCELL = 'focusNextCell',
  FOCUSPREVCELL = 'focusPrevCell',
  FOCUSCLICKEDCELL = 'focusClickedCell',
}

export interface ICreateCellActionType {
  type: CreateCellActionType;
  payload: any;
}

export interface IFocusCellActionType {
  type: FocusCellActionType;
  payload: number;
}

function createCellReducer(state: any, action: ICreateCellActionType) {
  const prevState = [...state];
  switch (action.type) {
    case CreateCellActionType.ADDCELL:
      state.splice(action.payload.index + 1, 0, { id: generateRandId() });
      return [...prevState];
    case CreateCellActionType.REMOVECELL:
      if (prevState.length !== 1) {
        prevState.splice(action.payload.index, 1);
        return [...prevState];
      }
      return [...prevState];

    default:
      return state;
  }
}

function focusCellReducer(state: any, action: IFocusCellActionType) {
  switch (action.type) {
    case FocusCellActionType.FOCUSNEXTCELL:
      return action.payload + 1;
    case FocusCellActionType.FOCUSPREVCELL:
      return action.payload - 1;
    case FocusCellActionType.FOCUSCLICKEDCELL:
      return action.payload;
    default:
      return state;
  }
}

function App() {
  const floatingToolBoxRef = useRef<HTMLDivElement>(null);
  const [blogCellContent, createCellDispatch] = useReducer(
    createCellReducer,
    initialState
  );
  const [focusState, dispatchFocusState] = useReducer(focusCellReducer, 0);

  return (
    <BlogContentList>
      {blogCellContent!.map((cellData: any) => (
        <Cell
          key={cellData.id}
          floatingToolBoxRef={floatingToolBoxRef}
          focusState={focusState}
          createCellDispatch={createCellDispatch}
          dispatchFocusState={dispatchFocusState}
        >
          {/* Example:<b>bold</b> and <i>italic</i> */}
        </Cell>
      ))}
      <ToolBox focusState={focusState} />
      <FloatingToolBox ref={floatingToolBoxRef} />
    </BlogContentList>
  );
}

export default App;
