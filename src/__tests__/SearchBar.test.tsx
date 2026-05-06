import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

// Мокаем fetchSuggestions
jest.mock('../components/SearchBar', () => {
  const original = jest.requireActual('../components/SearchBar');
  return {
    __esModule: true,
    default: original.default,
    fetchSuggestions: jest.fn().mockResolvedValue(['coding', 'cobalt']),
  };
});

test('поиск показывает подсказки после ввода 3+ символов', async () => {
  render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  );
  
  const input = screen.getByPlaceholderText(/Поиск промптов/i);
  fireEvent.change(input, { target: { value: 'cod' } });
  
  // Ждём debounce 500ms + задержку мока
  await waitFor(() => expect(screen.getByText('coding')).toBeInTheDocument(), { timeout: 1000 });
  expect(screen.getByText('cobalt')).toBeInTheDocument();
});