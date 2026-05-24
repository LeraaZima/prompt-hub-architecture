import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { PromptProvider } from '../context/PromptContext';
import SearchBar from '../components/SearchBar';

jest.mock('../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value
}));

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

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('поиск рендерится без ошибок', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/Поиск промптов/i);
    expect(input).toBeInTheDocument();
  });

  test('поиск показывает алерт при менее 2 символах', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/Поиск промптов/i);
    fireEvent.change(input, { target: { value: 't' } });
    const button = screen.getByRole('button', { name: 'Найти' });
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalledWith('Введите минимум 2 символа');
    alertMock.mockRestore();
  });

  test('поиск не вызывает алерт при 2+ символах', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/Поиск промптов/i);
    fireEvent.change(input, { target: { value: 'te' } });
    const button = screen.getByRole('button', { name: 'Найти' });
    fireEvent.click(button);
    expect(alertMock).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });
});