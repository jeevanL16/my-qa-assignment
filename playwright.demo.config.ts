import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  fullyParallel: false,
  workers: 1,
  timeout: 300_000,
  use: {
    ...baseConfig.use,
    headless: false,
    navigationTimeout: 60_000,
    launchOptions: {
      slowMo: 1000,
    },
  },
});
