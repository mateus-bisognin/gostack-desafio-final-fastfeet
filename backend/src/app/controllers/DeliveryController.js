import { Op } from 'sequelize';
import { isBefore, isAfter, setHours, startOfDay, endOfDay } from 'date-fns';

import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Problem from '../models/Problem';
import File from '../models/File';

import DeliveryCancellationMail from '../jobs/DeliveryCancellationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { id: deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: { id: deliveryman_id },
      attributes: ['id', 'name', 'email', 'createdAt'],
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Registry was not found' });
    }

    const { delivered = null, page = 1 } = req.query;
    const query = {
      deliveryman_id,
      canceled_at: null,
      ...(delivered ? { [Op.not]: { end_date: null } } : { end_date: null }),
    };

    const data = await Package.findAll({
      where: query,
      attributes: ['id', 'start_date', 'end_date', 'createdAt'],
      offset: (page - 1) * 10,
      limit: 10,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['address_city'],
        },
      ],
    });

    return res.json({ deliveryman, deliveries: data });
  }

  async store(req, res) {
    const { id: deliveryman_id } = req.params;
    const { packageId } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: { id: deliveryman_id },
      attributes: ['id', 'name', 'email', 'createdAt'],
    });

    if (!deliveryman) {
      return res
        .status(401)
        .json({ error: 'Deliveryman registry was not found' });
    }

    const todayWithdrawals = await Package.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
        end_date: null,
        canceled_at: null,
      },
    });

    if (todayWithdrawals.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Deliveryman has already withdrawn 5 packages today' });
    }

    const foundPackage = await Package.findByPk(packageId);

    /* #region Validation  */
    if (!foundPackage) {
      return res.status(401).json({ error: 'Package registry was not found' });
    }

    if (foundPackage.deliveryman_id != deliveryman_id) {
      return res
        .status(401)
        .json({ error: 'Package was not found in deliveryman`s list' });
    }

    if (foundPackage.canceled_at) {
      return res.status(400).json({ error: 'Delivery was already cancelled' });
    }
    if (foundPackage.end_date) {
      return res.status(400).json({ error: 'Package is already delivered' });
    }

    if (foundPackage.start_date) {
      return res.status(400).json({ error: 'Package is already withdrawn' });
    }
    /* #endregion */

    const before = isBefore(new Date(), setHours(new Date(), 18));
    const after = isAfter(new Date(), setHours(new Date(), 8));

    const isBetween = before && after;
    if (!isBetween) {
      return res
        .status(401)
        .json({ error: 'You can only withdraw packages between 8h and 18h' });
    }

    foundPackage.start_date = new Date();

    await foundPackage.save();

    return res.json(foundPackage);
  }

  async update(req, res, next) {
    const { id: deliveryman_id, packageId } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: { id: deliveryman_id },
      attributes: ['id', 'name', 'email', 'createdAt'],
    });

    if (!deliveryman) {
      return next({
        name: 'remove uploaded file',
        status: 401,
        message: 'Deliveryman registry was not found',
      });
    }

    const foundPackage = await Package.findByPk(packageId);

    /* #region Validation  */
    if (!foundPackage) {
      return next({
        name: 'remove uploaded file',
        status: 401,
        message: 'Package registry was not found',
      });
    }

    if (foundPackage.deliveryman_id != deliveryman_id) {
      return next({
        name: 'remove uploaded file',
        status: 401,
        message: 'Package was not found in deliveryman`s list',
      });
    }

    if (foundPackage.canceled_at) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Delivery was already cancelled',
      });
    }
    if (foundPackage.end_date) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Package is already delivered',
      });
    }
    if (!foundPackage.start_date) {
      return next({
        name: 'remove uploaded file',
        status: 400,
        message: 'Package was not withdrawn',
      });
    }
    /* #endregion */

    const { originalname, filename } = req.file !== undefined ? req.file : {};

    const { id: signature_id = null } =
      req.file !== undefined
        ? await File.create({
            name: originalname,
            path: filename,
          })
        : {};

    foundPackage.signature_id = signature_id;
    foundPackage.end_date = new Date();

    await foundPackage.save();

    return res.json(foundPackage);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await Problem.findByPk(id);

    if (!problem) {
      return res.status(400).json({ error: 'Problem registry was not found' });
    }

    const { package_id } = problem;

    const foundPackage = await Package.findByPk(package_id, {
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
    });

    if (!foundPackage) {
      return res.status(400).json({ error: 'Package registry was not found' });
    }
    if (foundPackage.canceled_at) {
      return res.status(400).json({ error: 'Package already cancelled' });
    }
    if (foundPackage.end_date) {
      return res.status(400).json({ error: 'Package already delivered' });
    }

    foundPackage.canceled_at = new Date();
    await foundPackage.save();

    await Queue.add(DeliveryCancellationMail.key, { foundPackage });

    return res.json(foundPackage);
  }
}

export default new DeliveryController();
