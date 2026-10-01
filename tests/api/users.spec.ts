import { test, expect } from '@playwright/test';
import { URLS } from '../test-data';

interface UserResponse {
  data: { id: number; email: string };
}

interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

function getApiHeaders(): Record<string, string> {
  const apiKey = process.env.REQRES_API_KEY;
  if (!apiKey) {
    throw new Error('REQRES_API_KEY is not set. Copy .env.example to .env and add your key.');
  }
  return { 'x-api-key': apiKey };
}

test.describe('ReqRes users API', () => {
  test('GET /api/users/2 returns 200 with an email', async ({ request }) => {
    const response = await request.get(`${URLS.api}/api/users/2`, {
      headers: getApiHeaders(),
    });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as UserResponse;
    expect(body.data.email).toBeTruthy();
  });

  test('POST /api/users returns 201 with the created name', async ({ request }) => {
    const response = await request.post(`${URLS.api}/api/users`, {
      headers: getApiHeaders(),
      data: { name: 'morpheus', job: 'leader' },
    });

    expect(response.status()).toBe(201);
    const body = (await response.json()) as CreateUserResponse;
    expect(body.name).toBe('morpheus');
  });

  test('GET /api/users/23 returns 404', async ({ request }) => {
    const response = await request.get(`${URLS.api}/api/users/23`, {
      headers: getApiHeaders(),
    });

    expect(response.status()).toBe(404);
  });
});
