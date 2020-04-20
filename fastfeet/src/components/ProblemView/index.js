import React from 'react';

import Modal from '~/components/Shared/Modal';

export default function ProblemView({ show, content, modalHandler }) {
  return (
    <Modal show={show} modalHandler={modalHandler}>
      <div>
        <h2>VISUALIZAR PROBLEMA</h2>
        <p>{content}</p>
      </div>
    </Modal>
  );
}
