import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Мок-функция поиска (замените на реальный API)
const searchPrompts = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, title: `Промпт для ${query} — пример 1`, description: 'Описание...' },
    { id: 2, title: `Промпт для ${query} — пример 2`, description: 'Описание...' },
  ];
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      setLoading(true);
      searchPrompts(query).then(data => {
        setResults(data);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <h1>Результаты поиска по запросу: "{query}"</h1>
      {loading && <p>Загрузка...</p>}
      {!loading && results.length === 0 && <p>Ничего не найдено. Попробуйте другой запрос.</p>}
      <ul>
        {results.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}