import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000/";

test.describe("Category carousels", () => {
  test("carousel row supports navigation, wheel scroll, and overlay actions", async ({ page }) => {
    await page.goto(BASE_URL);

    const carousel = page.locator("section[aria-label='Trending now carousel']");
    await expect(carousel).toBeVisible();

    await carousel.hover();

    const wrapper = carousel.locator(".swiper-wrapper").first();
    const box = await wrapper.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(400, 0);
    }

    await page.keyboard.press("ArrowLeft");

    const firstCard = carousel.locator("article").first();

    await firstCard.hover();
    const watchButton = firstCard.getByRole("button", { name: /Watch details/i });
    const addButton = firstCard.getByRole("button", { name: /Add to My List/i });

    await expect(watchButton).toBeVisible();
    await expect(addButton).toBeVisible();

    await watchButton.click();
    await addButton.click();

    await firstCard.focus();
    await page.keyboard.press("Tab");
    await expect(watchButton).toBeFocused();
  });
});
