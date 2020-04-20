import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, List, SearchField, SearchIcon } from './styles';
import ButtonAdd from '~/components/Shared/ButtonAdd';
import ButtonView from '~/components/Shared/ButtonView';
import ButtonEdit from '~/components/Shared/ButtonEdit';
import ButtonDelete from '~/components/Shared/ButtonDelete';
import DeliveryStatus from '~/components/DeliveryStatus';
import ActionsMenu from '~/components/ActionsMenu';
import DeliveryView from '~/components/DeliveryView';
import AvatarInitials from '~/components/AvatarInitials';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [productName, setProductName] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const modalHandler = (content) => {
    setViewModal(!viewModal);
    setModalContent(content);
  };

  useEffect(() => {
    update();
  }, [productName]);

  const update = useCallback(async () => {
    const response = await api.get('package', {
      params: { product: productName },
    });

    setDeliveries(response.data);
  }, [productName]);

  async function handleDelete(id) {
    const confirmation = window.confirm(
      `Deseja realmente excluir a encomenda nº ${id}?`
    );

    if (!confirmation) {
      return;
    }

    await api
      .delete(`package/${id}`)
      .then((response) => {
        toast.success('Encomenda excluída com sucesso!');
        update();
      })
      .catch(({ response }) => toast.error(response.data.error));
  }

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>
      <div className="search">
        <div>
          <SearchIcon />
          <SearchField
            value={productName}
            placeholder={'Buscar por encomendas'}
            type="text"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <ButtonAdd onClick={() => history.push('/deliveries/new')} />
      </div>
      <List>
        <ul className="head">
          <li className="flex0" style={{ minWidth: '92px' }}>
            <span> ID </span>
          </li>
          <li className="col2" style={{ minWidth: '187px' }}>
            <span> Destinatário </span>
          </li>
          <li className="flex0" style={{ minWidth: '181px' }}>
            <span> Entregador </span>
          </li>
          <li className="flex0" style={{ minWidth: '166px' }}>
            <span> Cidade </span>
          </li>
          <li className="flex0" style={{ minWidth: '217px' }}>
            <span> Estado </span>
          </li>
          <li className="flexGrow">
            <span> Status </span>
          </li>
          <li className="flexEnd">
            <span> Ações </span>
          </li>
        </ul>
        <div className="body">
          {deliveries.map((delivery) => (
            <div className="row" key={delivery.id}>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '92px' }}
              >
                <span>{'#' + delivery.id.toString().padStart(2, 0)}</span>
              </div>
              <div
                className="overflowHidden col2"
                style={{ minWidth: '187px' }}
              >
                <span>{delivery.recipient.name}</span>
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '181px' }}
              >
                <AvatarInitials name={delivery.deliveryman.name} />
                <span
                  className="overflowHidden"
                  style={{ maxWidth: '140px', marginRight: '10px' }}
                >
                  {delivery.deliveryman.name}
                </span>
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '166px' }}
              >
                <span>{delivery.recipient.address_city}</span>
              </div>
              <div
                className="overflowHidden flex0"
                style={{ minWidth: '217px' }}
              >
                <span>{delivery.recipient.address_state}</span>
              </div>
              <div className="overflowHidden flexGrow">
                <DeliveryStatus status={delivery.status} />
              </div>
              <div className="flexEnd">
                <ActionsMenu>
                  <ButtonView onClick={() => modalHandler(delivery)} />
                  <ButtonEdit
                    onClick={() =>
                      history.push(`/deliveries/${delivery.id}/edition`)
                    }
                  />
                  <ButtonDelete onClick={() => handleDelete(delivery.id)} />
                </ActionsMenu>
              </div>
            </div>
          ))}
        </div>
        <DeliveryView
          show={viewModal}
          modalHandler={() => modalHandler(modalContent)}
          content={modalContent}
        />
      </List>
    </Container>
  );
}
