import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { ReactComponent as Icon } from '~/assets/ic_add_24px.svg';

const AddButton = styled.button`
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding-right: 16px;
  padding-left: 21px;
  &:hover {
    background: ${darken(0.03, '#7D40E7')};
  }
`;

export default function ButtonAdd(props) {
  return (
    <AddButton {...props}>
      <Icon style={{ marginRight: '7px' }} />
      <p>cadastrar</p>
    </AddButton>
  );
}
