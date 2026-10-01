import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { USERS } from '../test-data';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user can log in and sees the Products page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('locked out user sees an error', async () => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('locked out');
  });
});
