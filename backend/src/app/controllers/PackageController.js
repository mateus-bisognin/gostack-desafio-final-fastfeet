import * as Yup from 'yup';
import { Op } from 'sequelize';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import DeliveryRegistrationMail from '../jobs/DeliveryRegistrationMail';
import Queue from '../../lib/Queue';

class PackageController {
  async index(req, res) {
    const { page = 1, product, ...query } = req.query;
    const packages = await Package.findAll({
      where: {
        ...query,
        ...(product && {
          product: {
            [Op.iLike]: `%${product}%`,
          },
        }),
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'address_city', 'address_state'],
        },
      ],
      order: [['id', 'DESC']],
    });
    return res.json(packages);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faileds' });
    }

    //const { id, product, recipient_id, deliveryman_id } = await Package.create(
    const { id } = await Package.create(req.body);
    const newPackage = await Package.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: ['id', 'product'],
    });

    await Queue.add(DeliveryRegistrationMail.key, { newPackage });

    return res.json(newPackage);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      deliveryman_id: Yup.number(),
      recipient_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const foundPackage = await Package.findByPk(id);

    if (!foundPackage) {
      return res.status(400).json({ error: 'Registry was not found' });
    }

    const { dataValues } = await foundPackage.update(req.body);
    // Verificar se é realmente necessário retornar valores
    const { product, recipient_id, deliveryman_id } = dataValues;
    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async delete(req, res) {
    const foundPackage = await Package.findByPk(req.params.id);

    if (!foundPackage) {
      return res.status(400).json({ error: 'Registry was not found' });
    }

    await foundPackage.destroy();

    return res.status(200).send();
  }
}

export default new PackageController();
