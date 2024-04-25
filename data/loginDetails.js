import { faker } from '@faker-js/faker';

export const loginDetails = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
