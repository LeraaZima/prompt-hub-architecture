import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditorPage from '../pages/EditorPage';

describe('EditorPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<EditorPage />);
    
    const titleInput = screen.getByPlaceholderText(/Код-ревью ассистент/i);
    fireEvent.change(titleInput, { target: { value: 'Test Prompt' } });
    
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'This is a valid prompt text with more than ten characters.' } });
    
    const submitButton = screen.getByText('Сохранить промпт');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('✨ Промпт сохранён!');
    });
    
    alertMock.mockRestore();
  });

  test('интеграционный тест: чекбокс "Опубликовать в хабе" работает', () => {
    render(<EditorPage />);
    
    const checkbox = screen.getByLabelText(/Опубликовать в публичном каталоге/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('поле ввода тегов работает корректно', () => {
    render(<EditorPage />);
    
    const tagsInput = screen.getByPlaceholderText(/coding, python, gpt4, ai/i);
    fireEvent.change(tagsInput, { target: { value: 'react, typescript, testing' } });
    
    expect(tagsInput).toHaveValue('react, typescript, testing');
  });

  test('кнопка отправки существует и не заблокирована', () => {
    render(<EditorPage />);
    
    const submitButton = screen.getByText('Сохранить промпт');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  test('заголовок страницы отображается корректно', () => {
    render(<EditorPage />);
    
    const heading = screen.getByText(/Создание промпта/i);
    expect(heading).toBeInTheDocument();
  });

  test('подсказка с поддерживаемым синтаксисом отображается', () => {
    render(<EditorPage />);
    
    const helpText = screen.getByText(/Поддерживается: ## заголовки, → стрелки/i);
    expect(helpText).toBeInTheDocument();
  });
});