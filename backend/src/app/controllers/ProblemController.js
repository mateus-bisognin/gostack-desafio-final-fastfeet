import * as Yup from 'yup';
import Problem from '../models/Problem';

class ProblemController {
  async index(req, res) {
    const { page = 1, id } = req.params;

    const problems = await Problem.findAll({
      where: { package_id: id },
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { description } = req.body;
    const { id: package_id } = req.params;
    const { id } = await Problem.create({ description, package_id });

    return res.json({ id, package_id, description });
  }
}

export default new ProblemController();
