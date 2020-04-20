import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  margin: auto 0px;

  nav {
    display: flex;
    align-items: center;
    img {
      margin: 0px 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }

    a {
      text-decoration: none;
      font-size: 15px;
      font-weight: bold;
      color: #999;
      margin-right: 21px;
      :active {
        color: #444;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  margin-right: 30px;
  margin-top: 6px;

  strong {
    white-space: nowrap;
    color: #666;
  }

  button {
    margin-top: 5px;
    white-space: nowrap;
    color: #de3b3b;
    border: none;
  }
`;
