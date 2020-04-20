import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Icon } from '~/assets/ic_edit_24px.svg';

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 0;
  color: #999;
  font-size: 16px;
  text-transform: capitalize;
`;

export default function ButtonEdit(props) {
  return (
    <EditButton {...props}>
      <Icon style={{ marginRight: '7px' }} />
      <p>editar</p>
    </EditButton>
  );
}
