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

test("Authentication pop-up", async ({}, testInfo) => {
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

  expect
    .soft(loginSuccessMsgText)
    .toEqual("Congratulations! You must have the proper credentials.");

  console.log("Title:", testInfo.title);
  console.log("TestId:", testInfo.testId);
  console.log("Title path:", testInfo.titlePath);

  await context.close();
  await browser.close();
});
