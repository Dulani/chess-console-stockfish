import { test, expect } from '@playwright/test';

test('verify integrated features', async ({ page }) => {
  // Use a larger viewport as recommended in memory
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('http://localhost:8000');

  // Verify title
  await expect(page).toHaveTitle(/Chess Analyst/);

  // Verify version display (h1 with title="v0.11")
  const h1 = page.locator('h1');
  await expect(h1).toHaveAttribute('title', 'v0.11');
  await expect(h1).toHaveText('Chess Analyst');

  // Verify sidebar offcanvas button position and functionality
  const menuButton = page.locator('button[data-bs-target="#offcanvasSidebar"]');
  await expect(menuButton).toBeVisible();

  // Verify it is on the left (float-start)
  const menuButtonContainer = menuButton.locator('..');
  await expect(menuButtonContainer).toHaveClass(/float-start/);

  await menuButton.click();

  const sidebar = page.locator('#offcanvasSidebar');
  await expect(sidebar).toBeVisible();

  // Verify Generate Recommendations button exists in sidebar
  const generateButton = page.locator('#generateButton');
  await expect(generateButton).toBeVisible();
  await expect(generateButton).toHaveText('Generate Recommendations');
});
