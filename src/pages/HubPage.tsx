import { useState } from 'react';
import { usePrompts } from '../context/PromptContext';

export default function HubPage() {
  const { getPublicPrompts, toggleFavorite, favorites } = usePrompts();
  const publicPrompts = getPublicPrompts();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrompts = publicPrompts.filter(prompt => {
    const matchesFilter = filter === 'all' || 
      (filter === 'favorites' && favorites.includes(prompt.id));
    const matchesSearch = searchTerm === '' || 
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>📚 Промпт-хаб</h1>
      
      {/* Поиск и фильтры */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Поиск по названию или тегам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '1rem'
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            background: 'white'
          }}
        >
          <option value="all">Все промпты</option>
          <option value="favorites">⭐ Избранное</option>
        </select>
      </div>
      
      {/* Список промптов */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  {prompt.title}
                  {prompt.isDemo && <span style={{ fontSize: '0.7rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '12px', marginLeft: '8px' }}>DEMO</span>}
                </h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {prompt.content.substring(0, 200)}...
                </p>
                {prompt.tags && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {prompt.tags.split(',').map((tag, i) => (
                      <span key={i} style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '20px', fontSize: '0.75rem' }}>
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleFavorite(prompt.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                {favorites.includes(prompt.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
        
        {filteredPrompts.length === 0 && (
          <div className="form-container" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Ничего не найдено 😢</p>
          </div>
        )}
      </div>
    </div>
  );
}