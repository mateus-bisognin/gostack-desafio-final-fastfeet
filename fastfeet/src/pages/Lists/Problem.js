import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, List } from './styles';
import ActionsMenu from '~/components/ActionsMenu';
import ButtonDelete from '~/components/Shared/ButtonDelete';
import ButtonView from '~/components/Shared/ButtonView';
import ProblemView from '~/components/ProblemView';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const modalHandler = (content) => {
    setViewModal(!viewModal);
    setModalContent(content);
  };

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problem/deliveries');

      setProblems(response.data);
    }

    loadProblems();
  }, []);

  async function handleCancellation({ id, package_id }) {
    const confirmation = window.confirm(
      `Deseja realmente cancelar a encomenda nº ${package_id}?`
    );

    if (!confirmation) {
      return;
    }

    await api
      .delete(`problem/${id}/cancel-delivery`)
      .then((response) => {
        toast.success('Encomenda cancelada com sucesso!');
      })
      .catch(({ response }) => toast.error(response.data.error));
  }

  return (
    <Container>
      <h1>Problemas na entrega</h1>
      <List>
        <ul className="head" style={{ marginTop: '34px' }}>
          <li className="flex0" style={{ minWidth: '212px' }}>
            <span> Encomenda </span>
          </li>
          <li className="flexGrow">
            <span> Problema </span>
          </li>
          <li className="col7">
            <span> Ações </span>
          </li>
        </ul>
        <div className="body">
          {problems.map((problem, index) => (
            <div className="row" key={index}>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '212px' }}
              >
                <span>
                  {'#' + problem.package_id.toString().padStart(2, 0)}
                </span>
              </div>
              <div className="overflowHidden flexGrow">
                <span>{problem.description}</span>
              </div>

              <div className="col7">
                <ActionsMenu
                  style={{ width: '200px', left: 'calc(50% - 103px)' }}
                >
                  <ButtonView
                    onClick={() => modalHandler(problem.description)}
                  />
                  <ButtonDelete
                    text="cancelar encomenda"
                    onClick={() => handleCancellation(problem)}
                  />
                </ActionsMenu>
              </div>
            </div>
          ))}
        </div>
      </List>
      <ProblemView
        show={viewModal}
        modalHandler={() => modalHandler(modalContent)}
        content={modalContent}
      />
    </Container>
  );
}
