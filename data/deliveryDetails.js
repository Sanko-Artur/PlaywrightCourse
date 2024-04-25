import { faker } from '@faker-js/faker';

export const deliveryDetails = {
  firstNameInput: faker.person.firstName(),
  lastNameInput: faker.person.lastName(),
  streetInput: faker.location.street(),
  postCodeInput: faker.location.zipCode(),
  cityInput: faker.location.city(),
  country: 'Poland',
};
