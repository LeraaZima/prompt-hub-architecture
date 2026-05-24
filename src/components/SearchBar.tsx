import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { usePrompts } from '../context/PromptContext';

export default function SearchBar() {
  const { getPublicPrompts } = usePrompts();
  const rawPrompts = getPublicPrompts();
  
  // Стабилизируем ссылку на массив (если содержимое не изменилось, то и массив будет тот же)
  const publicPrompts = useMemo(() => rawPrompts, [rawPrompts.length, JSON.stringify(rawPrompts)]);
  
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  // Для предотвращения лишних вызовов setSuggestions
  const prevSuggestionsRef = useRef<string[]>([]);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      const lowerQuery = debouncedQuery.toLowerCase();
      const matchedTitles = publicPrompts
        .map(p => p.title)
        .filter(title => title.toLowerCase().includes(lowerQuery));
      const matchedTags = publicPrompts
        .flatMap(p => p.tags ? p.tags.split(',').map(t => t.trim()) : [])
        .filter(tag => tag.toLowerCase().includes(lowerQuery));
      const uniqueSuggestions = Array.from(new Set([...matchedTitles, ...matchedTags])).slice(0, 6);
      
      // Сравниваем с предыдущим значением, чтобы избежать лишних обновлений
      if (JSON.stringify(uniqueSuggestions) !== JSON.stringify(prevSuggestionsRef.current)) {
        setSuggestions(uniqueSuggestions);
        prevSuggestionsRef.current = uniqueSuggestions;
      }
    } else {
      if (prevSuggestionsRef.current.length !== 0) {
        setSuggestions([]);
        prevSuggestionsRef.current = [];
      }
    }
  }, [debouncedQuery, publicPrompts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    } else if (query.trim().length > 0) {
      alert('Введите минимум 2 символа');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (query.length >= 2 && suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Поиск промптов..."
          aria-label="Поиск промптов"
        />
        <button
          type="submit"
          aria-label="Найти"
          style={{
            position: 'absolute',
            right: '5px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--gradient)',
            border: 'none',
            borderRadius: '100px',
            padding: '4px 12px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          Найти
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((s: string, idx: number) => (
            <div
              key={idx}
              className="suggestion-item"
              onMouseDown={() => handleSuggestionClick(s)}
              role="button"
              tabIndex={0}
              aria-label={`Подсказка: ${s}`}
            >
              🔍 {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}