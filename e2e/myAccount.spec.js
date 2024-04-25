import { test } from '@playwright/test';
import { MyAccountPage } from '../pageObjects/MyAccountPage';
import { getLoginToken } from '../apiCalls/getLoginToken';
import { setCookie } from '../utils/setCookie';
import { adminDetails } from '../data/adminDetails';

test('My account using cookie injection and mocking network request', async ({
  page,
}) => {
  const myAccount = new MyAccountPage(page);

  const loginToken = await getLoginToken(
    adminDetails.username,
    adminDetails.password
  );

  await page.route('**/api/user**', async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'PLAYWRIGHT ERROR FROM MOCKING' }),
    });
  });

  await myAccount.visit();

  await setCookie(page, loginToken);

  await myAccount.visit();
  await myAccount.waitForPageHeading();
  await myAccount.waitForErrorMessage();
});
