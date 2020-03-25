import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_street: Yup.string().required(),
      address_number: Yup.string().required(),
      address_complement: Yup.string(),
      address_state: Yup.string().required(),
      address_city: Yup.string().required(),
      address_zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { dataValues } = await Recipient.create(req.body);
    const { id, name, ...address } = dataValues;

    return res.json({
      id,
      name,
      address,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not provided' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      address_street: Yup.string(),
      address_number: Yup.string(),
      address_complement: Yup.string(),
      address_state: Yup.string(),
      address_city: Yup.string(),
      address_zipcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.findByPk(id);

    const { dataValues } = await recipient.update(req.body);
    const { id: recipientId, name, ...address } = dataValues;

    return res.json({
      id,
      name,
      address,
    });
  }
}

export default new RecipientController();
