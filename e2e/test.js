/* eslint-disable import/no-extraneous-dependencies */
import puppetteer from 'puppeteer';
import { hidden } from 'ansi-colors';

jest.setTimeout(30000); // default puppeteer timeout
describe('popover test', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 200,
      devtools: false, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test('should add .success class for valid inn', async () => {
    await page.goto(baseUrl);
    const button = await page.$('#button');
    button.click();
    await page.waitForSelector('.popover');
  });

  test('should add .alert class for invalid inn', async () => {
    await page.goto(baseUrl);
    const button = await page.$('#button');
    button.click();
    await page.waitForSelector('.popover');
    await page.waitFor(100);
    button.click();
    await page.waitForSelector('.popover', hidden);
  });
});
