import { test, expect } from '@playwright/test';
// import { v4 as uuidv4 } from 'uuid';

import { ProductPage } from '../pageObjects/productPage';
import { NavBar } from '../pageObjects/NavBar';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
import { LoginPage } from '../pageObjects/LoginPage';
import { SignUpPage } from '../pageObjects/SignUpPage';
import { DeliveryDetails } from '../pageObjects/DeliveryDetails';
import { PaymentPage } from '../pageObjects/PaymentPage';

import { loginDetails } from '../data/loginDetails';
import { deliveryDetails as userAddress } from '../data/deliveryDetails';
import { paymentDetails } from '../data/paymentDetails';

test('New user full e2e journey', async ({ page }) => {
  const productPage = new ProductPage(page);
  const navBar = new NavBar(page);
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const signUpPage = new SignUpPage(page);
  const deliveryDetails = new DeliveryDetails(page);
  const paymentPage = new PaymentPage(page);

  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);
  await navBar.goToCheckout();
  await checkoutPage.removeCheapestProd();
  await checkoutPage.clickContinueToCheckoutBtn();
  await loginPage.clickRegisterBtn();
  await signUpPage.signUpAsNewUser(loginDetails);
  await deliveryDetails.fillDetails(userAddress);
  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails);
  await paymentPage.completePayment();
});
