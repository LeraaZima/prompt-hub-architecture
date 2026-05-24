import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const { getPublicPrompts } = usePrompts();
  const publicPrompts = getPublicPrompts();
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = publicPrompts.filter(prompt =>
        prompt.title.toLowerCase().includes(query.toLowerCase()) ||
        (prompt.tags && prompt.tags.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
      setLoading(false);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query, publicPrompts]);

  const handlePromptClick = (id: string) => {
    navigate(`/hub/prompt/${id}`);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>🔍 Результаты поиска</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
        По запросу: <strong>“{query}”</strong>
      </p>

      {loading ? (
        <div className="form-container" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem' }}>Загрузка...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="form-container" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>😢 Ничего не найдено по запросу “{query}”</p>
          <button className="btn" onClick={() => navigate('/hub')} style={{ marginTop: '1rem' }}>
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {results.map((prompt) => (
            <div 
              key={prompt.id} 
              className="card"
              onClick={() => handlePromptClick(prompt.id)}
              style={{ cursor: 'pointer' }}
            >
              <h3 style={{ marginBottom: '0.5rem' }}>{prompt.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                {prompt.content.substring(0, 150)}...
              </p>
              {prompt.tags && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {prompt.tags.split(',').map((tag: string, i: number) => (
                    <span key={i} className="tag" style={{ cursor: 'default' }}>
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}