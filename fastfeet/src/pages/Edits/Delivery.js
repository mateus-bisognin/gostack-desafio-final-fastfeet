import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import ButtonSave from '~/components/Shared/ButtonSave';
import ButtonBack from '~/components/Shared/ButtonBack';
import { Container, FormHeader, FormFields, AsyncInputSelect } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required(),
  deliveryman_id: Yup.number().required(),
  recipient_id: Yup.number().required(),
});

export default function DeliveryEdition({ match }) {
  const productId = match.params.id;

  const [recipient, setRecipient] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [product, setProduct] = useState('');

  const [recipientId, setRecipientId] = useState(null);
  const [deliverymanId, setDeliverymanId] = useState(null);

  useEffect(() => {
    const loadDelivery = async () => {
      const response = await api.get('package', {
        params: { id: productId },
      });
      setProduct(response.data[0].product);
      setRecipient(response.data[0].recipient.name);
      setDeliveryman(response.data[0].deliveryman.name);
    };

    loadDelivery();
  });

  const loadRecipients = async (inputValue) => {
    const response = await api.get('recipient', {
      params: { name: inputValue },
    });
    return response.data.map((d) => ({ ...d, label: d.name, value: d.id }));
  };

  const loadDeliverymen = async (inputValue) => {
    const response = await api.get('deliveryman', {
      params: { name: inputValue },
    });
    return response.data.map((d) => ({ ...d, label: d.name, value: d.id }));
  };

  async function handleSubmit(data) {
    await api
      .put(`package/${productId}`, data)
      .then((response) => toast.success('Encomenda editada com sucesso!'))
      .catch(({ response }) => toast.error(response.data.error));

    history.goBack();
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <FormHeader>
          <h1>Edição de encomendas</h1>
          <div>
            <ButtonBack type="button" onClick={() => history.goBack()} />
            <ButtonSave type="submit" />
          </div>
        </FormHeader>
        <FormFields>
          <div className="row">
            <label className="custom">
              <strong>Destinatário</strong>
              <AsyncInputSelect
                loadOptions={loadRecipients}
                placeholder={recipient}
                isClearable
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
                onChange={(e) => {
                  if (e !== null) setRecipientId(e.id);
                }}
              />
              <Input
                value={recipientId}
                name="recipient_id"
                style={{ display: 'none' }}
              />
            </label>
            <label className="custom">
              <strong>Entregador</strong>
              <AsyncInputSelect
                loadOptions={loadDeliverymen}
                placeholder={deliveryman}
                isClearable
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
                onChange={(e) => {
                  if (e !== null) setDeliverymanId(e.id);
                }}
              />
              <Input
                value={deliverymanId}
                name="deliveryman_id"
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Nome do produto</strong>
              <Input placeholder={product} className="custom" name="product" />
            </label>
          </div>
        </FormFields>
      </Form>
    </Container>
  );
}
