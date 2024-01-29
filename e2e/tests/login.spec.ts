import { test, expect } from '@playwright/test';
import { mockLogout } from '../mocks/logout.mock';
import { mockUsers } from '../mocks/getUsers.mock';
import { mockLoginForUser } from '../mocks/login.mock';
import { getRandomUser } from '../generator/userGenerator';
import { mockRefreshForUser } from '../mocks/refresh.mock';

test('admin login', async ({ page }) => {
  // given
  const user = getRandomUser()
  await mockLoginForUser(page, user)
  await mockRefreshForUser(page, user)
  await mockUsers(page)
  await mockLogout(page)
  await page.goto('http://localhost:8081/login');
  await page.fill('#username', user.username);
  await page.fill('#password', user.password as string);

  // when
  await page.click('button[type="submit"]');

  // then
  await expect(page.locator('h1')).toContainText(user.firstName);
  const liCount = await page.locator('tbody tr').count();
  expect(liCount).toBeGreaterThan(10);
});