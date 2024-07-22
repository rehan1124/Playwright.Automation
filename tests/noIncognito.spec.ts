import {
  expect,
  test,
  Browser,
  Page,
  Locator,
  BrowserContext,
} from "@playwright/test";
import { chromium, webkit } from "@playwright/test";

test("No Incognito", async () => {
  const browserContext: BrowserContext = await chromium.launchPersistentContext(
    "./session",
    {
      headless: false,
    }
  );

  const page: Page = await browserContext.newPage();
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  );

  await page.close();
  await browserContext.close();
});
