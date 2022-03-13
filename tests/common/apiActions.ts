import { Page } from '@playwright/test'

export const login = async (page: Page) => {
    await page.goto('http://localhost:8081')
    await page.type('[name=password]', 'admin')
    await page.type('[name=username]', 'admin')
    await page.click('.btn-primary')
}