import React from 'react';

import { Status } from './styles';

const status = {
  delivered: {
    background: '#dff0df',
    color: '#2ca42b',
    text: 'Entregue',
  },
  pending: {
    background: '#f0f0df',
    color: '#c1bc35',
    text: 'Pendente',
  },
  withdrawn: {
    background: '#bad2ff',
    color: '#4d85ee',
    text: 'Retirada',
  },
  canceled: {
    background: '#fab0b0',
    color: '#de3b3b',
    text: 'Cancelada',
  },
};

export default function DeliveryStatus({ status: key }) {
  return (
    <Status
      style={{
        background: status[key].background,
        color: status[key].color,
      }}
    >
      <div style={{ background: status[key].color }}></div>
      <span>{status[key].text}</span>
    </Status>
  );
}
