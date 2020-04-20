import React from 'react';
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
  address_street: Yup.string().required(),
  address_number: Yup.string().required(),
  address_complement: Yup.string(),
  address_city: Yup.string().required(),
  address_state: Yup.string().required(),
  address_zipcode: Yup.string().required(),
});

export default function RecipientCreation() {
  async function handleSubmit(
    {
      name,
      address_street,
      address_number,
      address_complement,
      address_city,
      address_state,
      address_zipcode,
    },
    { resetForm }
  ) {
    await api
      .post('recipient', {
        name,
        address_street,
        address_number,
        address_complement,
        address_city,
        address_state,
        address_zipcode,
      })
      .then((response) => toast.success('Destinatário cadastrado com sucesso!'))
      .catch(({ response }) => toast.error(response.data.error));

    resetForm();
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <FormHeader>
          <h1>Cadastro de destinatário</h1>
          <div>
            <ButtonBack type="button" onClick={() => history.goBack()} />
            <ButtonSave type="submit" />
          </div>
        </FormHeader>

        <FormFields>
          <div className="row">
            <label className="custom">
              <strong>Nome</strong>
              <Input
                className="custom"
                name="name"
                placeholder="Ludwig Van Beethoven"
              />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Rua</strong>
              <Input
                className="custom"
                name="address_street"
                placeholder="Rua Beethoven"
              />
            </label>
            <label className="custom" style={{ width: '150px', flex: '0' }}>
              <strong>Número</strong>
              <Input
                className="custom"
                name="address_number"
                placeholder="1729"
              />
            </label>
            <label className="custom" style={{ width: '140px', flex: '0' }}>
              <strong>Complemento</strong>
              <Input className="custom" name="address_complement" />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Cidade</strong>
              <Input
                className="custom"
                name="address_city"
                placeholder="Diadema"
              />
            </label>
            <label className="custom">
              <strong>Estado</strong>
              <Input
                className="custom"
                name="address_state"
                placeholder="São Paulo"
              />
            </label>
            <label className="custom">
              <strong>CEP</strong>
              <Input
                className="custom"
                name="address_zipcode"
                placeholder="09960-580"
              />
            </label>
          </div>
        </FormFields>
      </Form>
    </Container>
  );
}
