import { test, expect } from '@playwright/test'

test.describe('login page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8081')
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })
  
    test.only('should successfully login', async ({ page }) => {
        await page.type('[name=password]', 'admin')
        await page.type('[name=username]', 'admin')
        await page.click('.btn-primary')
        await expect(page.locator('h1')).toContainText('Slawomir')
        const storage = await page.context().storageState()
        console.log(JSON.stringify(storage))
    })

    test('should fail to login', async ({ page }) => {
        await page.type('[name=password]', 'wrong')
        await page.type('[name=username]', 'wrong')
        await page.click('.btn-primary')
        await expect(page.locator('.alert-danger')).toContainText('Invalid username')
    })

    test('should trigger frontend validation', async ({ page }) => {
        await page.click('.btn-primary')
        await expect(page.locator('.invalid-feedback')).toHaveCount(2)
        await expect(page.locator('.invalid-feedback').nth(0)).toHaveText('Required field length is 4 or more')
        await expect(page.locator('.invalid-feedback').last()).toHaveText('Required field length is 4 or more')
        await expect(page.locator('[name=username]')).toHaveClass('form-control is-invalid')
        await expect(page.locator('[name=password]')).toHaveClass('form-control is-invalid')
    })

    test('should open register page', async ({ page }) => {
        await page.click('.btn-link')
        await expect(page).toHaveURL(/.*register/)
    })
  })
