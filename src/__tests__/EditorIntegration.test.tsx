import { render, screen, fireEvent } from '@testing-library/react';
import EditorPage from '../pages/EditorPage';

test('интеграционный тест: кнопка "Опубликовать в хабе" и изменение textarea', () => {
  render(<EditorPage />);
  
  const textarea = screen.getByLabelText(/Текст промпта/i) as HTMLTextAreaElement;
  fireEvent.change(textarea, { target: { value: 'New prompt content' } });
  expect(textarea.value).toBe('New prompt content');
  
  const checkbox = screen.getByLabelText(/Опубликовать в хабе/i) as HTMLInputElement;
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
  
  // Проверяем, что кнопка сохранения не заблокирована (валидация пройдена)
  const titleInput = screen.getByLabelText(/Название промпта/i);
  fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
  
  const submitButton = screen.getByText('Сохранить промпт');
  expect(submitButton).not.toBeDisabled();
});