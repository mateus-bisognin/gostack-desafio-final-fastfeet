import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import ButtonSave from '~/components/Shared/ButtonSave';
import ButtonBack from '~/components/Shared/ButtonBack';
import { Container, FormHeader, FormFields } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
});

export default function DeliverymanEdition({ match }) {
  const deliverymanId = match.params.id;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [avatarId, setAvatarId] = useState('');

  useEffect(() => {
    const loadDelivery = async () => {
      const response = await api.get('deliveryman', {
        params: { id: deliverymanId },
      });
      setName(response.data[0].name);
      setEmail(response.data[0].email);
      setAvatarId(response.data[0].avatar_id);
    };

    loadDelivery();
  });

  async function handleSubmit(data) {
    await api
      .put(`deliveryman/${deliverymanId}`, data)
      .then((response) => toast.success('Entregador editado com sucesso!'))
      .catch(({ response }) => toast.error(response.data.error));

    history.goBack();
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <FormHeader>
          <h1>Edição de entregadores</h1>
          <div>
            <ButtonBack type="button" onClick={() => history.goBack()} />
            <ButtonSave type="submit" />
          </div>
        </FormHeader>
        <FormFields>
          <div className="row">
            <label className="custom">
              <strong>Nome</strong>
              <Input placeholder={name} className="custom" name="name" />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Email</strong>
              <Input placeholder={email} className="custom" name="email" />
            </label>
          </div>
        </FormFields>
      </Form>
    </Container>
  );
}
