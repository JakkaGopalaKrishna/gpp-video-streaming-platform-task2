import { test, expect } from "@playwright/test";

test("user can open video page", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click("text=Big Buck Bunny");

  await expect(page).toHaveURL(/video/);
});
