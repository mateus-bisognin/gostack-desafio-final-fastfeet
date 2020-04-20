import styled from 'styled-components';

export const Status = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  width: fit-content;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 12px;
  font-weight: bold;
  padding-right: 8px;

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 6px;
  }
`;
