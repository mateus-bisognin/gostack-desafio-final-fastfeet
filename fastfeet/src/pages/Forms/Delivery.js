import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import ButtonSave from '~/components/Shared/ButtonSave';
import ButtonBack from '~/components/Shared/ButtonBack';
import { Container, FormHeader, FormFields, AsyncInputSelect } from './styles';

const schema = Yup.object().shape({
  recipient_id: Yup.string().required(),
  deliveryman_id: Yup.number().required(),
  product: Yup.string().required(),
});

export default function DeliveryCreation() {
  const [recipientId, setRecipientId] = useState(null);
  const [deliverymanId, setDeliverymanId] = useState(null);

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

  async function handleSubmit(
    { recipient_id, deliveryman_id, product },
    { resetForm }
  ) {
    await api
      .post('package', {
        recipient_id,
        deliveryman_id,
        product,
      })
      .then((response) => toast.success('Encomenda cadastrada com sucesso!'))
      .catch(({ response }) => toast.error(response.data.error));

    resetForm();
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <FormHeader>
          <h1>Cadastro de encomendas</h1>
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
                placeholder="Selecione o destinatário"
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
                placeholder="Selecione o entregador"
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
              <Input className="custom" name="product" />
            </label>
          </div>
        </FormFields>
      </Form>
    </Container>
  );
}
