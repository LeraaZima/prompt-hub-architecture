import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { PromptProvider } from '../context/PromptContext';
import EditorPage from '../pages/EditorPage';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <PromptProvider>
          {component}
        </PromptProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

test('интеграционный тест: кнопка "Опубликовать в хабе" и изменение textarea', () => {
  renderWithProviders(<EditorPage />);

  // Текстовая область
  const textarea = screen.getByLabelText(/Текст промпта/i) as HTMLTextAreaElement;
  fireEvent.change(textarea, { target: { value: 'New prompt content' } });
  expect(textarea.value).toBe('New prompt content');

  // Чекбокс – единственный на странице
  const checkboxes = screen.getAllByRole('checkbox');
  const checkbox = checkboxes[0] as HTMLInputElement;
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);

  // Поле заголовка – по плейсхолдеру
  const titleInput = screen.getByPlaceholderText(/Например: Ассистент для код-ревью/i);
  fireEvent.change(titleInput, { target: { value: 'Valid Title' } });

  // Кнопка отправки – по роли button и имени (нечувствительно к регистру и эмодзи)
  const submitButton = screen.getByRole('button', { name: /сохранить промпт/i });
  expect(submitButton).toBeInTheDocument();
});