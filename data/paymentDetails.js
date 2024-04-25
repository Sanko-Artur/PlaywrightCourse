import { faker } from '@faker-js/faker';

export const paymentDetails = {
  creditCardOwner: faker.person.fullName(),
  creditCardNumber: faker.finance.creditCardNumber(),
  validUntil: '12/30',
  creditCardCVC: faker.finance.creditCardCVV(),
};
