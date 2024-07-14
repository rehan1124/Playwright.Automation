// test.user1@gmail.com  test.user1
import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { webkit, chromium } from "@playwright/test";

test("Login test", async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
  );

  const email: Locator = page.locator("#input-email");
  const password: Locator = page.locator("#input-password");
  const loginBtn: Locator = page.locator("[value='Login']");

  await email.fill("test.user1@gmail.com");
  await password.fill("test.user1");
  await loginBtn.click();

  const pageTitle = await page.title();
  console.log(`Page title: ${pageTitle}`);

  await page.screenshot({ path: "Screenshots/Homepage.png" });

  expect(pageTitle).toEqual("My Account");

  await browser.close();
});
