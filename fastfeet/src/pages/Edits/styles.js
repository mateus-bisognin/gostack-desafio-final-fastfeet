import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const AsyncInputSelect = styled(AsyncSelect)`
  margin-top: 9px;
  color: #666;
  font-size: 16px;
`;

export const Container = styled.div`
  margin: 27px auto 0px auto;
  width: 900px;
  color: #444;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 26px 30px 32px 30px;

  div.row {
    display: flex;
    margin-bottom: 16px;
  }

  label.custom {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 14px;
  }

  label + label.custom {
    margin-left: 30px;
  }

  input.custom {
    margin-top: 9px;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 45px;
    padding-left: 15px;
    font-size: 16px;

    ::placeholder {
      color: #999;
    }
  }

  div.row:last-child {
    margin: 0;
  }
  span {
    color: red;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
  }

  div {
    display: flex;
    margin-top: 3px;
    button + button {
      margin-left: 16px;
    }
  }
`;
