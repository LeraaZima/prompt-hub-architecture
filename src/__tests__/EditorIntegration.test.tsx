import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PromptProvider } from '../context/PromptContext';
import { AuthProvider } from '../context/AuthContext';
import EditorPage from '../pages/EditorPage';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <PromptProvider>
          {component}
        </PromptProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

test('интеграционный тест: чекбокс "Опубликовать в хабе" и изменение textarea', () => {
  renderWithProviders(<EditorPage />);
  
  const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
  expect(textarea).toBeInTheDocument();
  
  fireEvent.change(textarea, { target: { value: 'New prompt content' } });
  expect(textarea.value).toBe('New prompt content');
  
  const checkbox = screen.getByRole('checkbox', { name: /Опубликовать в публичном каталоге/i }) as HTMLInputElement;
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
  
  const titleInput = screen.getByPlaceholderText(/Ассистент для код-ревью/i);
  fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
  
  const submitButton = screen.getByRole('button', { name: /сохранить промпт/i });
  expect(submitButton).toBeInTheDocument();
});