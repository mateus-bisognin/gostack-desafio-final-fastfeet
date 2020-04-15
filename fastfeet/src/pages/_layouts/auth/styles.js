import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  text-align: center;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  padding: 60px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    p {
      align-self: flex-start;
      font-weight: bold;
      color: #444;
      margin-bottom: 9px;
      margin-top: 10px;
    }
    input {
      display: flex;
      justify-content: center;
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 5px;
      color: #444;

      &::placeholder {
        color: #999999;
      }
    }
    span {
      color: red;
      align-self: flex-start;
      font-size: 12px;
      color: rgba(255, 0, 0, 0.7);
    }
    button {
      height: 45px;
      margin-top: 10px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#7D40E7')};
      }
    }
    span + button {
      margin-top: 15px;
    }
  }
`;
