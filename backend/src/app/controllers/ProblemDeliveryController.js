import Problem from '../models/Problem';

class ProblemDeliveryController {
  async index(req, res) {
    const { page = 1 } = req.params;
    const problems = await Problem.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'package_id', 'description'],
    });

    return res.json(problems);
  }
}

export default new ProblemDeliveryController();
