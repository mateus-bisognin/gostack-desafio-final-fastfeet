import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Buttons = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 10px 16px 10px;

  li {
    border-bottom: 1px solid #eee;
    padding: 6px 0;
    line-height: 21px;

    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border: 0;
      padding-bottom: 0;
    }
  }
`;

export const Badge = styled.button`
  border: 0;
`;

export const Menu = styled.div`
  position: absolute;
  width: 150px;
  /* height: 120px; */

  left: calc(50% - 78px);
  top: calc(100% + 15px);
  z-index: 1;
  background: #fff;
  box-shadow: 0px 0px 2px #00000026;
  border-radius: 4px;

  display: ${(props) => (props.visible ? 'block' : 'none')};
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 3px);

    top: -9px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid #fff;
    filter: drop-shadow(0px -2px 2px rgba(0, 0, 0, 0.1));
  }
`;
