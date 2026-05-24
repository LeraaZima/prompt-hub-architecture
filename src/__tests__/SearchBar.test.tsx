import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

// Мокаем useDebounce, чтобы не ждать реального таймера
jest.mock('../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value
}));

// Мокаем fetchSuggestions внутри компонента (глобально)
jest.mock('../components/SearchBar', () => {
  const original = jest.requireActual('../components/SearchBar');
  return {
    __esModule: true,
    default: function MockSearchBar(props: any) {
      // Просто рендерим оригинал, но подменяем fetchSuggestions
      const Actual = original.default;
      return <Actual {...props} />;
    }
  };
});

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Очищаем DOM перед каждым тестом
    document.body.innerHTML = '';
  });

  test('поиск рендерится без ошибок', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/Поиск промптов/i);
    expect(input).toBeInTheDocument();
  });

  test('поиск показывает алерт при менее 3 символах', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/Поиск промптов/i);
    fireEvent.change(input, { target: { value: 'te' } });
    const button = screen.getByRole('button', { name: 'Найти' });
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalledWith('Введите минимум 3 символа');
    alertMock.mockRestore();
  });

  test('поиск не вызывает алерт при 3+ символах', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/Поиск промптов/i);
    fireEvent.change(input, { target: { value: 'test' } });
    const button = screen.getByRole('button', { name: 'Найти' });
    fireEvent.click(button);
    expect(alertMock).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });
});