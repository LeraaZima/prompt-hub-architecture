import { test, expect } from '@playwright/test';

test('пользовательский сценарий: создание промпта, поиск, избранное', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Авторизация через localStorage
  await page.evaluate(() => {
    localStorage.setItem('user', JSON.stringify({ id: '123', name: 'testuser', email: 'test@test.com' }));
  });
  await page.reload();
  await expect(page.locator('text=Выйти')).toBeVisible();

  // Переход в Мои шаблоны
  await page.click('text=Профиль');
  await expect(page).toHaveURL(/\/profile/);
  await page.click('text=Мои шаблоны');
  await expect(page).toHaveURL(/\/profile\/my-templates/);

  // Создание шаблона
  await page.click('button:has-text("Создать новый шаблон")');
  await expect(page).toHaveURL(/\/editor/);

  await page.fill('input[name="title"]', 'E2E Test Prompt');
  await page.fill('textarea', 'This is an E2E test prompt content with sufficient length.');
  await page.check('input[name="isPublic"]');

  // Сохранение (без ожидания диалога)
  await page.click('button:has-text("Сохранить промпт")');
  await page.waitForTimeout(2000);

  // Принудительный переход в Мои шаблоны
  await page.goto('http://localhost:3000/profile/my-templates');
  await expect(page.locator('.card h3:has-text("E2E Test Prompt")')).toBeVisible({ timeout: 10000 });

  // Поиск
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder*="Поиск"]', 'E2E');
  await page.press('input[placeholder*="Поиск"]', 'Enter');
  await expect(page).toHaveURL(/\/search\?q=E2E/);
  await expect(page.locator('.card h3:has-text("E2E Test Prompt")')).toBeVisible();

  // Переход в каталог для добавления в избранное (на странице поиска нет кнопки избранного)
  await page.goto('http://localhost:3000/hub');
  await expect(page.locator('.card h3:has-text("E2E Test Prompt")')).toBeVisible();

  // Добавление в избранное
  const card = page.locator('.card:has-text("E2E Test Prompt")');
  await card.locator('button[aria-label="Добавить в избранное"]').click();
  await expect(card.locator('button[aria-label="Удалить из избранного"]')).toBeVisible();

  // Проверка избранного
  await page.click('text=Профиль');
  await page.click('text=Избранное');
  await expect(page).toHaveURL(/\/profile\/favorites/);
  await expect(page.locator('.card h3:has-text("E2E Test Prompt")')).toBeVisible();
});