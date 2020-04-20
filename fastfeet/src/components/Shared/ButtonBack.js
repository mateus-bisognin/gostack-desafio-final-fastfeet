import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { ReactComponent as Icon } from '~/assets/ic_keyboard_arrow_left_24px.svg';

const Button = styled.button`
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding-right: 16px;
  padding-left: 21px;
  &:hover {
    background: ${darken(0.03, '#ccc')};
  }
`;

export default function ButtonBack(props) {
  return (
    <Button {...props}>
      <Icon style={{ marginRight: '7px' }} />
      <p>voltar</p>
    </Button>
  );
}
