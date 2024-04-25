export async function setCookie(page, loginToken) {
  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = `token=${loginTokenInsideBrowserCode}`;
    },
    [loginToken]
  );
}
