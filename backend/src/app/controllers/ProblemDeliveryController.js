import Problem from '../models/Problem';

class ProblemDeliveryController {
  async index(req, res) {
    const { page = 1 } = req.params;
    const problems = await Problem.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'package_id', 'description'],
      order: [['id', 'DESC']],
    });

    return res.json(problems);
  }
}

export default new ProblemDeliveryController();
