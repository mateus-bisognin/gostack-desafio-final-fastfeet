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
  address_street: Yup.string().required(),
  address_number: Yup.string().required(),
  address_complement: Yup.string(),
  address_city: Yup.string().required(),
  address_state: Yup.string().required(),
  address_zipcode: Yup.string().required(),
});

export default function RecipientEdition({ match }) {
  const recipientId = match.params.id;

  const [name, setName] = useState('');
  const [address_street, setaddress_street] = useState('');
  const [address_number, setaddress_number] = useState('');
  const [address_complement, setaddress_complement] = useState('');
  const [address_city, setaddress_city] = useState('');
  const [address_state, setaddress_state] = useState('');
  const [address_zipcode, setaddress_zipcode] = useState('');

  useEffect(() => {
    const loadDelivery = async () => {
      const response = await api.get('recipient', {
        params: { id: recipientId },
      });
      setName(response.data[0].name);

      setaddress_street(response.data[0].address_street);
      setaddress_number(response.data[0].address_number);
      setaddress_complement(response.data[0].address_complement);
      setaddress_city(response.data[0].address_city);
      setaddress_state(response.data[0].address_state);
      setaddress_zipcode(response.data[0].address_zipcode);
    };

    loadDelivery();
  });

  async function handleSubmit(data) {
    await api
      .put(`recipient/${recipientId}`, data)
      .then((response) => toast.success('Destinatário editado com sucesso!'))
      .catch(({ response }) => toast.error(response.data.error));

    history.goBack();
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
              <Input className="custom" name="name" placeholder={name} />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Rua</strong>
              <Input
                className="custom"
                name="address_street"
                placeholder={address_street}
              />
            </label>
            <label className="custom" style={{ width: '150px', flex: '0' }}>
              <strong>Número</strong>
              <Input
                className="custom"
                name="address_number"
                placeholder={address_number}
              />
            </label>
            <label className="custom" style={{ width: '140px', flex: '0' }}>
              <strong>Complemento</strong>
              <Input
                className="custom"
                name="address_complement"
                placeholder={address_complement}
              />
            </label>
          </div>
          <div className="row">
            <label className="custom">
              <strong>Cidade</strong>
              <Input
                className="custom"
                name="address_city"
                placeholder={address_city}
              />
            </label>
            <label className="custom">
              <strong>Estado</strong>
              <Input
                className="custom"
                name="address_state"
                placeholder={address_state}
              />
            </label>
            <label className="custom">
              <strong>CEP</strong>
              <Input
                className="custom"
                name="address_zipcode"
                placeholder={address_zipcode}
              />
            </label>
          </div>
        </FormFields>
      </Form>
    </Container>
  );
}
