import React from 'react';
import { lighten } from 'polished';

import { Container } from './styles';

const randomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 90;
  const lightness = 20;
  const color = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  return color;
};

export default function AvatarInitials({ name }) {
  const eachName = name.split(' ');
  const initials =
    eachName.length > 1 ? eachName[0][0] + eachName[1][0] : eachName[0][0];

  const color = randomColor();
  console.tron.log(color);

  return (
    <Container
      style={{
        background: `${lighten(0.7, color)}`,
        color: `${color}`,
      }}
    >
      <p>{initials}</p>
    </Container>
  );
}
