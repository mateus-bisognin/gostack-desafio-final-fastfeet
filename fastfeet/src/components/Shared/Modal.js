import React, { useState } from 'react';
import styled from 'styled-components';

import Backdrop from './Backdrop';

const StyledModal = styled.div`
  position: fixed;
  z-index: 500;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  max-height: 800px;
  overflow: auto;
  padding: 26px 23px 60px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  transition: all 0.3s ease-out;

  h2 {
    color: #444;
    font-size: 14px;
    margin-bottom: 4px;
  }

  p {
    color: #666;
    font-size: 16px;
    line-height: 26px;
  }

  .info {
    padding-bottom: 12px;
    /* flex: 1; */
    border-top: 1px solid #eee;
    padding-top: 8px;
    &:first-child {
      padding-top: 0;
      border-top: 0;
    }
  }
`;

export default function Modal(props) {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalHandler} />
      <StyledModal
        style={{
          display: props.show ? 'block' : 'none',
        }}
      >
        {props.children}
      </StyledModal>
    </>
  );
}
