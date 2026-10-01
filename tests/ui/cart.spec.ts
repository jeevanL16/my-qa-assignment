import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { PRODUCT, URLS, USERS } from '../test-data';

test.describe('Cart and logout', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('adding a product shows 1 in the cart badge', async () => {
    await inventoryPage.addToCart(PRODUCT.backpackId);

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('removing the product hides the cart badge', async () => {
    await inventoryPage.addToCart(PRODUCT.backpackId);
    await inventoryPage.removeFromCart(PRODUCT.backpackId);

    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('user can log out and returns to the login page', async ({ page }) => {
    await inventoryPage.logout();

    await expect(page).toHaveURL(`${URLS.shop}/`);
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
});
