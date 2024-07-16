import {
  test,
  expect,
  Browser,
  Page,
  Locator,
  BrowserContext,
} from "@playwright/test";
import { webkit, chromium } from "@playwright/test";

test("Understanding browser context", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });

  //   --- Browser context 1 ---
  const browserContext1: BrowserContext = await browser.newContext();
  const page1: Page = await browserContext1.newPage();

  await page1.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
  );

  const email: Locator = page1.locator("#input-email");
  const password: Locator = page1.locator("#input-password");
  const loginBtn: Locator = page1.locator("[value='Login']");

  await email.fill("test.user1@gmail.com");
  await password.fill("test.user1");
  await loginBtn.click();

  const pageTitle = await page1.title();
  console.log(`Page title: ${pageTitle}`);

  await page1.screenshot({ path: "Screenshots/Homepage.png" });

  expect(pageTitle).toEqual("My Account");

  //   --- Browser context 2 ---
  const browserContext2: BrowserContext = await browser.newContext();
  const page2: Page = await browserContext2.newPage();

  await page2.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
  );

  const email2: Locator = page2.locator("#input-email");
  const password2: Locator = page2.locator("#input-password");
  const loginBtn2: Locator = page2.locator("[value='Login']");

  await email2.fill("test.user2@gmail.com");
  await password2.fill("test.user2");
  await loginBtn2.click();

  const pageTitle2 = await page2.title();
  console.log(`Page title: ${pageTitle2}`);

  await page2.screenshot({ path: "Screenshots/Homepage.png" });

  expect(pageTitle2).toEqual("My Account");

  //   --- Closing both contexts ---
  browserContext1.close();
  browserContext2.close();
  browser.close();
});
