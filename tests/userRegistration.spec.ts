import {
  test,
  expect,
  Browser,
  Locator,
  Page,
  BrowserContext,
} from "@playwright/test";
import { webkit, chromium } from "@playwright/test";

test("New user registration", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const browserContext: BrowserContext = await browser.newContext();
  const page: Page = await browserContext.newPage();

  //   --- Account registration URL ---
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  );
  await expect(
    page.getByRole("heading", { name: "Register Account" })
  ).toBeVisible();

  const firstName: Locator = page.getByRole("textbox", { name: "First Name" });
  await firstName.fill("Arthur");

  const lastName: Locator = page.getByRole("textbox", { name: "Last Name" });
  await lastName.fill("Dayne");

  const email: Locator = page.getByRole("textbox", { name: "E-Mail" });
  await email.fill("Arthur.Dayne@gmail.com");

  const telephone: Locator = page.getByRole("textbox", { name: "Telephone" });
  await telephone.fill("1234567890");

  const password: Locator = page.locator("#input-password");
  await password.fill("Arthur123456@");
  const confirmPassword: Locator = page.locator("#input-confirm");
  await confirmPassword.fill("Arthur123456@");

  const subscribeYes: Locator = page.getByRole("radio", { name: "Yes" });
  await subscribeYes.click();

  const privacyPolicy: Locator = page.locator("[name='agree']");
  await privacyPolicy.click();

  const continuebtn: Locator = page.getByRole("button", { name: "Continue" });
  await continuebtn.click();

  await page.close();
  await browserContext.close();
  await browser.close();
});
