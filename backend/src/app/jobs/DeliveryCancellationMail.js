import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryCancellationMail {
  get key() {
    return 'DeliveryCancellationMail';
  }

  async handle({ data }) {
    const {
      foundPackage: { id, product, deliveryman, recipient, canceled_at },
    } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        id,
        deliveryman,
        recipient,
        product,
        date: format(
          parseISO(canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryCancellationMail();
