import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, name, ...query } = req.query;

    const deliverymen = await Deliveryman.findAll({
      where: {
        ...query,
        ...(name && {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        }),
      },
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id']],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Registry was not found' });
    }

    const { dataValues } = await deliveryman.update(req.body);
    // Verificar se é realmente necessário retornar valores

    const { name, email } = dataValues;

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Registry was not found' });
    }

    await deliveryman.destroy();

    return res.status(200).send();
  }
}

export default new DeliverymanController();
