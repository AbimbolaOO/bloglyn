import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

const Button: React.FC<IButton> = ({
  children,
  value,
  btnDisableState,
  dispatchBtnDisableState,
}) => {
  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [controlBtn, setToControlbtn] = useState(false);

  useEffect(() => {
    setBtnDisabledState(btnDisableState[value]);
  }, [btnDisableState]);

  const onClickHandler = (event: any) => {
    setToControlbtn(!controlBtn);
    dispatchBtnDisableState({ type: value, payload: !controlBtn });
  };
  return (
    <ButtonStyled
      disabled={btnDisabledState}
      data-floating-toolbox
      value={value}
      onClick={onClickHandler}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;

// === interface
interface IButton {
  children: any;
  value: string;
  btnDisableState: any;
  dispatchBtnDisableState: any;
}

// === styled
const ButtonStyled = styled.button`
  background-color: transparent;
  font-family: 'Montagu Slab', serif;
  font-size: 1.5rem;
  border: none;
  color: var(--active-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  &:disabled {
    color: var(--disabled-text-color);
  }

  & > sub {
    margin-top: 3px;
  }
`;
