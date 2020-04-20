import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import ButtonSave from '~/components/Shared/ButtonSave';
import ButtonBack from '~/components/Shared/ButtonBack';
import ImageInput from '~/components/Shared/ImageInput';
import { Container, FormHeader, FormFields } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
});

export default function DeliverymanCreation() {
  async function handleSubmit(data, { resetForm }) {
    await api
      .post('deliveryman', data)
      .then((response) => toast.success('Entregador cadastrado com sucesso!'))
      .catch(({ response }) => toast.error(response.data.error));

    resetForm();
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <FormHeader>
          <h1>Cadastro de entregadores</h1>
          <div>
            <ButtonBack type="button" onClick={() => history.goBack()} />
            <ButtonSave type="submit" />
          </div>
        </FormHeader>
        <FormFields>
          <ImageInput name="file" />
          <div className="row">
            <label className="custom">
              <strong>Nome</strong>
              <Input className="custom" name="name" />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Email</strong>
              <Input className="custom" name="email" />
            </label>
          </div>
        </FormFields>
      </Form>
    </Container>
  );
}
