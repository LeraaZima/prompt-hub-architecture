import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test('поиск ввода 3+ символов не вызывает алерт', async () => {
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
    
    expect(alertMock).not.toHaveBeenCalledWith('Введите минимум 3 символа');
    alertMock.mockRestore();
  });
});