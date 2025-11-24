import { test, expect } from "@playwright/test";

test.describe("Hero carousel", () => {
  test("supports arrows, pagination, keyboard, and live announcements", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const hero = page.locator("section[aria-label='Featured hero carousel']");
    const liveRegion = hero.locator("p.sr-only");
    const nextButton = page.locator(".swiper-button-next");
    const paginationPoints = page.locator(".swiper-pagination-bullet");
    const pauseButton = page.getByRole("button", { name: /PAUSE|RESUME/ });

    await expect(liveRegion).toHaveText(/Currently showing:/i);
    await expect(nextButton).toBeVisible();

    await nextButton.click();
    await expect(liveRegion).toContainText("Aurora Runs");
    await expect(page.getByRole("heading", { name: "Aurora Runs" })).toBeVisible();

    await hero.click();
    await page.keyboard.press("ArrowRight");
    await expect(liveRegion).toContainText("Glass Ocean");

    await paginationPoints.nth(2).click();
    await expect(liveRegion).toContainText("Glass Ocean");

    await pauseButton.click();
    await expect(pauseButton).toHaveText("RESUME");
    await pauseButton.click();
    await expect(pauseButton).toHaveText("PAUSE");
  });
});