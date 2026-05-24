import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface HubPageProps {
  sidebarFilter?: string;
  sidebarTag?: string;
}

export default function HubPage({ sidebarFilter = 'all', sidebarTag = 'all' }: HubPageProps) {
  const navigate = useNavigate();
  const { getPublicPrompts, toggleFavorite, favorites } = usePrompts();
  const { copyToClipboard } = useCopyToClipboard();
  const publicPrompts = getPublicPrompts();
  
  const [filterType, setFilterType] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setFilterType(sidebarFilter);
  }, [sidebarFilter]);

  useEffect(() => {
    setSelectedTag(sidebarTag);
  }, [sidebarTag]);

  const filteredPrompts = useMemo(() => {
    let result = [...publicPrompts];
    if (filterType === 'favorites') {
      result = result.filter(p => favorites.includes(p.id));
    }
    if (selectedTag !== 'all') {
      result = result.filter(p => 
        p.tags && p.tags.split(',').map(t => t.trim()).includes(selectedTag)
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) ||
        (p.tags && p.tags.toLowerCase().includes(term))
      );
    }
    return result;
  }, [publicPrompts, filterType, selectedTag, searchTerm, favorites]);

  const handleCopy = async (id: string, content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const clearFilters = () => {
    setFilterType('all');
    setSelectedTag('all');
    setSearchTerm('');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>📚 Промпт-хаб</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Поиск по названию или тегам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Поиск промптов"
          style={{
            flex: 2,
            minWidth: '200px',
            padding: '0.75rem',
            borderRadius: '12px',
            border: '2px solid var(--border-color)',
            fontSize: '1rem',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}
        />
        {(filterType !== 'all' || selectedTag !== 'all' || searchTerm) && (
          <button onClick={clearFilters} className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
            🗑️ Сбросить фильтры
          </button>
        )}
      </div>

      <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Найдено: {filteredPrompts.length} из {publicPrompts.length} промптов
      </p>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredPrompts.map((prompt) => (
          <div 
            key={prompt.id} 
            className="card" 
            onClick={() => navigate(`/hub/prompt/${prompt.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  {prompt.title}
                  {prompt.isDemo && <span className="tag demo-tag">DEMO</span>}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {prompt.content.substring(0, 200)}...
                </p>
                {prompt.tags && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {prompt.tags.split(',').map((tag, i) => (
                      <span key={i} className="tag" style={{ cursor: 'default' }}>
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopy(prompt.id, prompt.content); }}
                  aria-label="Копировать промпт"
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '0.5rem' }}
                >
                  {copiedId === prompt.id ? '✅' : '📋'}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(prompt.id); }}
                  aria-label={favorites.includes(prompt.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem' }}
                >
                  {favorites.includes(prompt.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredPrompts.length === 0 && (
          <div className="form-container" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Ничего не найдено 😢</p>
            <button onClick={clearFilters} className="btn" style={{ marginTop: '1rem' }}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}