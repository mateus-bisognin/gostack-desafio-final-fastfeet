import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, List, SearchField, SearchIcon } from './styles';
import ButtonAdd from '~/components/Shared/ButtonAdd';
import ButtonEdit from '~/components/Shared/ButtonEdit';
import ButtonDelete from '~/components/Shared/ButtonDelete';
import ActionsMenu from '~/components/ActionsMenu';

export default function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [recipientName, setRecipientName] = useState('');

  useEffect(() => {
    update();
  }, [recipientName]);

  const update = useCallback(async () => {
    const response = await api.get('recipient', {
      params: { name: recipientName },
    });

    setRecipients(response.data);
  }, [recipientName]);

  async function handleDelete({ name, id }) {
    const confirmation = window.confirm(
      `Deseja realmente excluir este destinatário?
        - nome: ${name}
        - id:   ${id}`
    );

    if (!confirmation) {
      return;
    }

    await api
      .delete(`recipient/${id}`)
      .then((response) => {
        toast.success('Destinatário excluído com sucesso!');
        update();
      })
      .catch(({ response }) => toast.error(response.data.error));
  }

  return (
    <Container>
      <h1>Gerenciando destinatários</h1>
      <div className="search">
        <div>
          <SearchIcon />
          <SearchField
            value={recipientName}
            placeholder={'Buscar por destinatários'}
            type="text"
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>
        <ButtonAdd onClick={() => history.push('/recipients/new')} />
      </div>
      <List>
        <ul className="head">
          <li className="flex0" style={{ minWidth: '93px' }}>
            <span> ID </span>
          </li>
          <li className="flex0" style={{ minWidth: '241px' }}>
            <span> Nome </span>
          </li>
          <li className="flexGrow">
            <span> Endereço </span>
          </li>
          <li className="col7">
            <span> Ações </span>
          </li>
        </ul>
        <div className="body">
          {recipients.map((recipient) => (
            <div className="row" key={recipient.id}>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '93px' }}
              >
                <span>{'#' + recipient.id.toString().padStart(2, 0)}</span>
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '241px' }}
              >
                <span>{recipient.name}</span>
              </div>
              <div className="overflowHidden flexGrow">
                <span>
                  {recipient.address_street && `${recipient.address_street}, `}
                  {recipient.address_number &&
                    `nº ${recipient.address_number}, `}
                  {recipient.address_complement &&
                    `${recipient.address_complement}, `}
                  {recipient.address_city && `${recipient.address_city} - `}
                  {recipient.address_state && `${recipient.address_state}`}
                </span>
              </div>
              <div className="col7">
                <ActionsMenu>
                  <ButtonEdit
                    onClick={() =>
                      history.push(`/recipients/${recipient.id}/edition`)
                    }
                  />
                  <ButtonDelete onClick={() => handleDelete(recipient)} />
                </ActionsMenu>
              </div>
            </div>
          ))}
        </div>
      </List>
    </Container>
  );
}
