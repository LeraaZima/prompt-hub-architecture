import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

// Мок-функция получения подсказок (замените на реальный API)
const fetchSuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 3) return [];
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300));
  const mockSuggestions = [
    'coding assistant',
    'python debug',
    'react component',
    'sql query',
    'email writer'
  ].filter(s => s.includes(query.toLowerCase()));
  return mockSuggestions;
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      fetchSuggestions(debouncedQuery).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 3) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    } else {
      alert('Введите минимум 3 символа');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Поиск промптов (минимум 3 символа)..."
          style={{ width: '300px', padding: '8px' }}
        />
        <button type="submit">Найти</button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          background: 'white',
          border: '1px solid #ccc',
          listStyle: 'none',
          margin: 0,
          padding: '8px',
          width: '300px',
          zIndex: 10
        }}>
          {suggestions.map((s, idx) => (
            <li key={idx} onMouseDown={() => handleSuggestionClick(s)} style={{ cursor: 'pointer' }}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}