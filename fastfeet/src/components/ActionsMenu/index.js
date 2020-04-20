import React, { useState, useRef, useEffect } from 'react';

import { Container, Buttons, Badge, Menu } from './styles';
import { ReactComponent as MoreIcon } from '~/assets/ic_more_horiz_24px.svg';

export default function ActionsMenu({ style = {}, children }) {
  const [visible, setVisible] = useState(false);
  const node = useRef();
  const toggleButton = useRef();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleClick(e) {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    if (toggleButton.current.contains(e.target)) {
      // inside click
      return;
    }
    setVisible(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <Container>
      <Badge onClick={handleToggleVisible} ref={toggleButton}>
        <MoreIcon />
      </Badge>
      <Menu visible={visible} ref={node} style={style}>
        <Buttons>
          {children.map((Child, index) => (
            <li key={index}>{Child}</li>
          ))}
        </Buttons>
      </Menu>
    </Container>
  );
}
