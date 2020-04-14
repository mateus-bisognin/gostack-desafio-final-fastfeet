import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, name, ...query } = req.query;
    const recipients = await Recipient.findAll({
      where: {
        ...query,
        ...(name && {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        }),
      },
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(recipients);
  }

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

    if (!recipient) {
      return res.status(400).json({ error: 'Registry was not found' });
    }

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
