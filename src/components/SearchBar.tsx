import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

const fetchSuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 3) return [];
  await new Promise(resolve => setTimeout(resolve, 300));
  const mockSuggestions = [
    'coding assistant',
    'python debug',
    'react component',
    'sql query',
    'email writer',
    'code review',
    'api generator'
  ].filter(s => s.toLowerCase().includes(query.toLowerCase()));
  return mockSuggestions;
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
      setIsFocused(false);
    } else if (query.trim().length > 0 && query.trim().length < 3) {
      alert('Введите минимум 3 символа');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
    setIsFocused(false);
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
            setIsFocused(true);
            if (query.length >= 3 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false);
              setIsFocused(false);
            }, 200);
          }}
          placeholder="Поиск промптов..."
        />
        <button
          type="submit"
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
          {suggestions.map((s, idx) => (
            <div
              key={idx}
              className="suggestion-item"
              onMouseDown={() => handleSuggestionClick(s)}
            >
              🔍 {s}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .search-wrapper {
          position: relative;
        }
        
        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          margin-top: 8px;
          overflow: hidden;
          z-index: 1000;
          border: 1px solid rgba(0,0,0,0.05);
        }
        
        .suggestion-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
          color: #333;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .suggestion-item:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          padding-left: 24px;
        }
        
        .suggestion-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}