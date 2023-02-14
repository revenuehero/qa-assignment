import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Then,
  When,
  World,
} from '@cucumber/cucumber';
import { ChromiumBrowser, chromium, Page } from 'playwright';
import { expect } from '@playwright/test';

let browser: ChromiumBrowser;

interface ICustomWorld extends World {
  page: Page;
}

const PAGE_URL = 'http://localhost:3000';

BeforeAll(async function (this: ICustomWorld) {
  browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
});

Before(async function (this: ICustomWorld) {
  this.page = await browser.newPage();
});

When('I go to the pokemon search page', async function (this: ICustomWorld) {
  await this.page.goto(PAGE_URL);

  await this.page.waitForURL(PAGE_URL);
});

Then('I see pokemons listed on the page', async function (this: ICustomWorld) {
  expect(
    await this.page.locator('[data-testid^=pokemon-item-]').count(),
  ).toBeGreaterThan(0);
});

When(
  'I search for {string}',
  async function (this: ICustomWorld, name: string) {
    await this.page.getByTestId('pokemon-search-input').fill(name);
  },
);

Then(
  'I see {string} in the results',
  async function (this: ICustomWorld, name: string) {
    await expect(
      this.page.getByTestId('pokemon-list').getByText(name),
    ).toBeVisible();
  },
);

After(async function (this: ICustomWorld) {
  await this.page.close();
});

AfterAll(async function (this: ICustomWorld) {
  await browser.close();
});
