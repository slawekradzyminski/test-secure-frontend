import { test, expect } from '@playwright/test';

test('admin login', async ({ page }) => {
  // given
  await page.route('http://localhost:4001/users/signin', route => route.fulfill({
    status: 200,
    body: JSON.stringify({
      "username": "user",
      "roles": [
        "ROLE_ADMIN"
      ],
      "firstName": "John",
      "lastName": "Doe",
      "token": "token",
      "email": "user@example.com",
      "doctorTypes": [
        {
          "id": 0,
          "doctorType": "string"
        }
      ]
    }),
  }));
  await page.route('http://localhost:4001/users/refresh', route => route.fulfill({
    status: 200,
    body: JSON.stringify({
      "username": "user",
      "roles": [
        "ROLE_ADMIN"
      ],
      "firstName": "John",
      "lastName": "Doe",
      "token": "token",
      "email": "user@example.com",
      "doctorTypes": [
        {
          "id": 0,
          "doctorType": "string"
        }
      ]
    }),
  }));
  await page.route('http://localhost:4001/users', route => route.fulfill({
    status: 200,
    body: JSON.stringify([])
  }));
  await page.route('http://localhost:4001/users/logout', route => route.fulfill({
    status: 200,
  }));
  await page.goto('http://localhost:8081/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin');

  // when
  await page.click('button[type="submit"]');

  // then
  await expect(page.locator('h1')).toHaveText(/John/);
});