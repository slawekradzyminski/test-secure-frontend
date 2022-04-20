import { test, expect } from '@playwright/test'
import { login } from './common/apiActions'

test.describe('home page', () => {
    test.beforeEach(async ({ page, request }) => {
        const response = await login(request)
        console.log(response)
        await page.goto('http://localhost:8081')
        localStorage.setItem('user', response);
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })
  
    test('should display at least one user', async ({ page }) => {
        await page.isVisible('ul li')
    })

    test('should click delete and cancel', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure you wish to delete this item?');
            await dialog.dismiss();
          });
        await page.locator('ul li', { hasText: /Gosia.*/}).locator('.delete').click()
    })

  })
