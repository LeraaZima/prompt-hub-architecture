import { test, expect } from '@playwright/test';

test('пользовательский сценарий: создание промпта, поиск, просмотр', async ({ page }) => {
  // 1. Заход на сайт
  await page.goto('http://localhost:3000');
  
  // 2. Вход в аккаунт (через модальное окно)
  await page.click('button:has-text("Войти")');
  await page.fill('input[type="email"]', 'test@test.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button:has-text("Войти")');
  await page.waitForTimeout(1000);
  
  // 3. Переход в личный кабинет (профиль)
  await page.click('text=Профиль');
  await expect(page).toHaveURL(/\/profile/);
  
  // 4. Переход к моим шаблонам
  await page.click('text=Мои шаблоны');
  await expect(page).toHaveURL(/\/profile\/my-templates/);
  
  // 5. Клик по кнопке "Создать новый шаблон"
  await page.click('button:has-text("Создать новый шаблон")');
  await expect(page).toHaveURL(/\/editor/);
  
  // 6. Заполнение формы и отправка
  await page.fill('input[name="title"]', 'E2E Test Prompt');
  await page.fill('textarea', 'This is an E2E test prompt content with sufficient length.');
  await page.check('input[name="isPublic"]');
  
  // Обработка диалога
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  
  // 7. Использование поиска (на главной)
  await page.goto('http://localhost:3000');
  await page.fill('input[placeholder*="Поиск"]', 'test');
  await page.press('input[placeholder*="Поиск"]', 'Enter');
  await expect(page).toHaveURL(/\/search\?q=test/);
  
  // 8. Проверка результатов поиска
  await expect(page.locator('h1')).toContainText('Результаты поиска');
});