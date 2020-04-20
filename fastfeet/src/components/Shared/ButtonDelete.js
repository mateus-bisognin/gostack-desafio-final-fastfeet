import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Icon } from '~/assets/ic_delete_forever_24px.svg';

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 0;
  color: #999;
  font-size: 16px;
  text-transform: capitalize;
`;

export default function ButtonDelete({ text = 'excluir', ...rest }) {
  return (
    <DeleteButton {...rest}>
      <Icon style={{ marginRight: '7px' }} />
      <p>{text}</p>
    </DeleteButton>
  );
}
