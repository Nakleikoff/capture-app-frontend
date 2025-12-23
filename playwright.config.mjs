import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173',
    headless: process.env.HEADLESS ? true : false,
  },

  webServer: {
    command: 'npm run dev',
    port: 5173,
    timeout: 120 * 1000,
    reuseExistingServer: true,
    env: {
      VITE_API_URL: 'http://localhost:5173/api'
    }
  }
});

