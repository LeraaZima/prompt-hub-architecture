import { render, screen, fireEvent } from '@testing-library/react';
import EditorPage from '../pages/EditorPage';

test('валидация формы редактора: показывает ошибки при пустых полях', async () => {
  render(<EditorPage />);
  
  const submitButton = screen.getByText('Сохранить промпт');
  fireEvent.click(submitButton);
  
  const titleError = await screen.findByText(/Название не менее 3 символов/i);
  const contentError = await screen.findByText(/Текст промпта не менее 10 символов/i);
  
  expect(titleError).toBeInTheDocument();
  expect(contentError).toBeInTheDocument();
});

test('форма отправляется при валидных данных', async () => {
  render(<EditorPage />);
  
  fireEvent.change(screen.getByLabelText(/Название промпта/i), { target: { value: 'Test Prompt' } });
  fireEvent.change(screen.getByLabelText(/Текст промпта/i), { target: { value: 'This is a valid prompt text with more than ten characters.' } });
  
  fireEvent.click(screen.getByText('Сохранить промпт'));
  
  // Мокаем alert, чтобы проверить вызов
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  expect(alertMock).toHaveBeenCalledWith('Промпт сохранён!');
  alertMock.mockRestore();
});