import {
  test,
  expect,
  Browser,
  Page,
  Locator,
  BrowserContext,
} from "@playwright/test";
import { chromium, webkit } from "@playwright/test";

function createAuthToken(username: String, password: String) {
  return "Basic " + btoa(`${username}:${password}`);
}

test("Authentication pop-up", async () => {
  const browser: Browser = await webkit.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  const username: String = "admin";
  const password: String = "admin";

  page.setExtraHTTPHeaders({
    Authorization: createAuthToken(username, password),
  });
  await page.goto("https://the-internet.herokuapp.com/basic_auth");

  const loginSuccessMsg: Locator = page.locator("[id='content'] p");
  const loginSuccessMsgText: String = await loginSuccessMsg.innerText();
  console.log(`Success msg: ${loginSuccessMsgText}`);

  expect(loginSuccessMsgText).toEqual(
    "Congratulations! You must have the proper credentials."
  );

  await context.close();
  await browser.close();
});
