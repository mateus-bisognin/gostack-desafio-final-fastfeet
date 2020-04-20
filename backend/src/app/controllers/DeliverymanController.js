import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

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
      attributes: ['id', 'name', 'email', 'avatar_id'],
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id']],
    });

    return res.json(deliverymen);
  }

  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Validation failed',
      });
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Deliveryman already exists',
      });
    }

    const { originalname, filename } = req.file !== undefined ? req.file : {};

    const { id: avatar_id = null } =
      req.file !== undefined
        ? await File.create({
            name: originalname,
            path: filename,
          })
        : {};

    const { id, name } = await Deliveryman.create({
      ...req.body,
      avatar_id,
    });

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Validation failed',
      });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Registry was not found',
      });
    }

    const { originalname, filename } = req.file !== undefined ? req.file : {};

    const { id: avatar_id = null } =
      req.file !== undefined
        ? await File.create({
            name: originalname,
            path: filename,
          })
        : {};

    const { dataValues } = await deliveryman.update({
      ...req.body,
      avatar_id,
    });

    const { name, email } = dataValues;

    return res.json({
      id,
      name,
      email,
      avatar_id,
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
