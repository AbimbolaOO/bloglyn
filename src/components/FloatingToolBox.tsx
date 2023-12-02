import { forwardRef, useReducer } from 'react';

import styled from '@emotion/styled';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import Button from './Button';

const initialBtnDisableState = {
  bold: false,
  emphasis: false,
  link: false,
  h1: false,
  h2: false,
  quote: false,
};

function buttonDisabledReducer(state: any, action: any) {
  switch (action.type) {
    case 'h1':
      console.log('h1 doning it', action.payload);
      if (action.payload) {
        return { ...state, bold: true, emphasis: true, link: true };
      }
      return {
        ...initialBtnDisableState,
      };

    case 'h2':
      console.log('h2 doning it', action.payload);
      if (action.payload) {
        return { ...state, link: false, bold: true, emphasis: true };
      }
      return {
        ...initialBtnDisableState,
      };
    case 'quote':
      console.log('quote doning it');
      return {
        ...initialBtnDisableState,
      };
    default:
      return state;
  }
}

const initialBtnControlState = {
  bold: false,
  emphasis: false,
  link: false,
  h1: false,
  h2: false,
  quote: false,
};

const FloatingToolBox = forwardRef<Ref, IFloatingToolBox>(
  ({ children }, ref) => {
    const [btnDisableState, dispatchBtnDisableState] = useReducer(
      buttonDisabledReducer,
      initialBtnDisableState
    );

    return (
      <FloatBox ref={ref}>
        <Button
          btnDisableState={btnDisableState}
          dispatchBtnDisableState={dispatchBtnDisableState}
          value="bold"
        >
          B
        </Button>
        <Button
          btnDisableState={btnDisableState}
          dispatchBtnDisableState={dispatchBtnDisableState}
          value="emphasis"
        >
          <em>i</em>
        </Button>
        <Button
          btnDisableState={btnDisableState}
          dispatchBtnDisableState={dispatchBtnDisableState}
          value="link"
        >
          <InsertLinkIcon />
        </Button>
        <VerticalLine />
        <Button
          btnDisableState={btnDisableState}
          dispatchBtnDisableState={dispatchBtnDisableState}
          value="h1"
        >
          T
        </Button>
        <Button
          btnDisableState={btnDisableState}
          dispatchBtnDisableState={dispatchBtnDisableState}
          value="h2"
        >
          <sub>T</sub>
        </Button>
        <Button
          btnDisableState={btnDisableState}
          dispatchBtnDisableState={dispatchBtnDisableState}
          value="quote"
        >
          <sub>&#10077;</sub>
        </Button>
      </FloatBox>
    );
  }
);

export default FloatingToolBox;

// === interface
interface IFloatingToolBox {
  children?: any;
}

// === types
export type Ref = any;

// === style
const FloatBox = styled.div`
  --active-text-color: #f4f2f2;
  --disabled-text-color: #5b5959;
  --background-color: #252525;
  --triangle-height: 8px;

  position: absolute;
  top: 10px;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;

  gap: 8px;
  font-size: 24px;
  padding: 6px 16px;
  width: fit-content;
  border-radius: 8px;
  background-color: var(--background-color);

  &::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: calc(var(--triangle-height) / 1.1) solid transparent;
    border-bottom: 0px;
    border-top: var(--triangle-height) solid var(--background-color);
  }
`;

const VerticalLine = styled.div`
  place-self: center;
  width: 1px;
  height: 60%;
  background-color: var(--disabled-text-color);
`;
