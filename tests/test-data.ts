export const URLS = {
  shop: 'https://www.saucedemo.com',
  api: 'https://reqres.in',
} as const;

export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
} as const;

export const PRODUCT = {
  backpackId: 'sauce-labs-backpack',
} as const;
