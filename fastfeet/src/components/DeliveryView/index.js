import React from 'react';
import { parseISO, format } from 'date-fns';

import Modal from '~/components/Shared/Modal';

export default function DeliveryView({
  show,
  content: delivery,
  modalHandler,
}) {
  return (
    <Modal show={show} modalHandler={modalHandler}>
      {delivery.recipient !== undefined ? (
        <div>
          <div className="info">
            <h2>Informações da encomenda</h2>
            <p>
              {delivery.recipient.address_street &&
                `${delivery.recipient.address_street}, `}
              {delivery.recipient.address_number &&
                `${delivery.recipient.address_number}, `}
              {delivery.recipient.address_complement &&
                `${delivery.recipient.address_complement}`}
            </p>

            <p>
              {delivery.recipient.address_city &&
                `${delivery.recipient.address_city} - `}
              {delivery.recipient.address_state &&
                `${delivery.recipient.address_state}`}
            </p>
            <p>
              {delivery.recipient.address_zipcode &&
                `${delivery.recipient.address_zipcode}`}
            </p>
          </div>

          <div className="info">
            <h2>Datas</h2>
            <p>
              <strong>Retirada:</strong>{' '}
              {delivery.start_date &&
                format(parseISO(delivery.start_date), 'dd/MM/yyyy')}
            </p>
            <p>
              <strong>Entrega:</strong>{' '}
              {delivery.end_date &&
                format(parseISO(delivery.start_date), 'DD/MM/YYYY')}
            </p>
          </div>

          <div className="info">
            <h2>Assinatura do destinatário</h2>
          </div>
        </div>
      ) : (
        <div />
      )}
    </Modal>
  );
}
