import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Icon } from '~/assets/ic_visibility_24px.svg';

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 0;
  color: #999;
  font-size: 16px;
  text-transform: capitalize;
`;

export default function ButtonView(props) {
  return (
    <ViewButton {...props}>
      <Icon style={{ marginRight: '7px' }} />
      <p>visualizar</p>
    </ViewButton>
  );
}
