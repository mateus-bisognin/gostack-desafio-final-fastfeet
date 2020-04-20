import styled from 'styled-components';

import { ReactComponent as ScIcon } from '~/assets/ic_search_24px.svg';

export const Container = styled.div`
  margin: 27px auto 0px auto;
  max-width: 1200px;
  color: #444;

  h1 {
    font-size: 24px;
  }

  .search {
    display: flex;
    margin-top: 34px;
    justify-content: space-between;

    div {
      /* display: flex; */
      position: relative;
    }
  }
`;

export const SearchIcon = styled(ScIcon)`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 16px;
`;

export const SearchField = styled.input`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  font-size: 14;
  height: 36px;
  width: 237px;
  padding-left: 40px;
  padding-right: 10px;
  color: #666;

  ::placeholder {
    color: #999;
    font-family: 'Helvetica', FontAwesome, sans-serif;
  }
`;

export const List = styled.div`
  display: grid;

  ul.head {
    display: flex;
    /* justify-content: space-evenly; */
    font-weight: bold;
    font-size: 16px;
    margin-top: 22px;
    margin-bottom: 12px;
    padding-left: 24px;
    padding-right: 13px;
  }
  div.body {
    display: flex;
    flex-direction: column;
    /* height: 400px;
    overflow: scroll; */
  }
  div.row {
    display: flex;
    align-items: center;
    position: relative;
    /* justify-content: space-between; */
    padding-left: 25px;
    padding-right: 28px;
    background: #fff;
    min-height: 57px;
    border-radius: 4px;
    margin-bottom: 21px;
    font-size: 16px;
    color: #666;

    &:last-child {
      margin: 0;
    }
  }

  .flex0 {
    flex: 0;
    display: flex;
    align-items: center;
  }
  .col2 {
    flex: 0;
    margin-right: 10px;
  }
  .flexGrow {
    flex: 1;
  }
  .flexEnd {
    flex: 0;
    justify-content: flex-end;
  }

  .overflowHidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
