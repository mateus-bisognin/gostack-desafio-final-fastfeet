import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, List, SearchField, SearchIcon } from './styles';
import ButtonAdd from '~/components/Shared/ButtonAdd';
import ButtonEdit from '~/components/Shared/ButtonEdit';
import ButtonDelete from '~/components/Shared/ButtonDelete';
import ActionsMenu from '~/components/ActionsMenu';
import AvatarInitials from '~/components/AvatarInitials';

export default function DeliverymanList() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [deliverymanName, setDeliverymanName] = useState('');

  useEffect(() => {
    update();
  }, [deliverymanName]);

  const update = useCallback(async () => {
    const response = await api.get('deliveryman', {
      params: { name: deliverymanName },
    });

    setDeliverymen(response.data);
  }, [deliverymanName]);

  async function handleDelete({ name, id }) {
    const confirmation = window.confirm(
      `Deseja realmente excluir este entregador?
        - nome: ${name}
        - id:   ${id}`
    );

    if (!confirmation) {
      return;
    }

    await api
      .delete(`deliveryman/${id}`)
      .then((response) => {
        toast.success('Entregador excluído com sucesso!');
        update();
      })
      .catch(({ response }) => toast.error(response.data.error));
  }

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>
      <div className="search">
        <div>
          <SearchIcon />
          <SearchField
            value={deliverymanName}
            placeholder={'Buscar por entregadores'}
            type="text"
            onChange={(e) => setDeliverymanName(e.target.value)}
          />
        </div>
        <ButtonAdd onClick={() => history.push('/deliverymen/new')} />
      </div>
      <List>
        <ul className="head">
          <li className="flex0" style={{ minWidth: '195px' }}>
            <span> ID </span>
          </li>
          <li className="flex0" style={{ minWidth: '258px' }}>
            <span> Foto </span>
          </li>
          <li className="flex0" style={{ minWidth: '309px' }}>
            <span> Nome </span>
          </li>
          <li className="flex0" style={{ minWidth: '369px' }}>
            <span> Email </span>
          </li>
          <li className="col7">
            <span> Ações </span>
          </li>
        </ul>
        <div className="body">
          {deliverymen.map((deliveryman) => (
            <div className="row" key={deliveryman.id}>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '195px' }}
              >
                <span>{'#' + deliveryman.id.toString().padStart(2, 0)}</span>
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '258px' }}
              >
                <AvatarInitials name={deliveryman.name} />
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '309px' }}
              >
                <span>{deliveryman.name}</span>
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '369px' }}
              >
                <span>{deliveryman.email}</span>
              </div>
              <div className="col7">
                <ActionsMenu>
                  <ButtonEdit
                    onClick={() =>
                      history.push(`/deliverymen/${deliveryman.id}/edition`)
                    }
                  />
                  <ButtonDelete onClick={() => handleDelete(deliveryman)} />
                </ActionsMenu>
              </div>
            </div>
          ))}
        </div>
      </List>
    </Container>
  );
}
