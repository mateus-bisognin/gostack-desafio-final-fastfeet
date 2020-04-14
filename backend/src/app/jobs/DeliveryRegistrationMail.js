import Mail from '../../lib/Mail';

class DeliveryRegistrationMail {
  get key() {
    return 'DeliveryRegistrationMail';
  }

  async handle({ data }) {
    const {
      newPackage: { id, product, deliveryman, recipient },
    } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova Entrega Cadastrada',
      template: 'registration',
      context: {
        id,
        deliveryman,
        recipient,
        product,
      },
    });
  }
}

export default new DeliveryRegistrationMail();
