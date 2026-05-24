import { usePrompts } from '../context/PromptContext';

interface SidebarProps {
  onFilterChange?: (filter: string) => void;
  onTagSelect?: (tag: string) => void;
  selectedTag?: string;
  currentFilter?: string;
}

export default function Sidebar({ onFilterChange, onTagSelect, selectedTag, currentFilter }: SidebarProps) {
  const { getPublicPrompts, favorites } = usePrompts();
  const publicPrompts = getPublicPrompts();

  const allTags = Array.from(new Set(
    publicPrompts.flatMap(p => p.tags ? p.tags.split(',').map(t => t.trim()) : [])
  )).sort();

  const handleTagClick = (tag: string) => {
    if (onTagSelect) onTagSelect(tag);
  };

  const handleFilterClick = (filter: string) => {
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <aside className="sidebar-glass">
      <h4 style={{ marginBottom: '1rem' }}>🔍 Фильтры</h4>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <p style={{ fontWeight: 600, margin: 0 }}>🏷️ Теги</p>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>▼</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allTags.map(tag => (
            <span
              key={tag}
              className={`tag ${selectedTag === tag ? 'tag-active' : ''}`}
              onClick={() => handleTagClick(tag)}
              role="button"
              tabIndex={0}
              aria-label={`Фильтр по тегу ${tag}`}
              style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <p style={{ fontWeight: 600, margin: 0 }}>❤️ Избранное</p>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>▼</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li
            onClick={() => handleFilterClick('all')}
            role="button"
            tabIndex={0}
            aria-label="Показать все промпты"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: currentFilter === 'all' ? 'bold' : 'normal',
              background: currentFilter === 'all' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: currentFilter === 'all' ? 'var(--primary)' : 'var(--text-secondary)',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <span>📋 Все промпты</span>
            {currentFilter === 'all' && <span style={{ fontSize: '0.75rem' }}>✓</span>}
          </li>
          <li
            onClick={() => handleFilterClick('favorites')}
            role="button"
            tabIndex={0}
            aria-label="Показать только избранное"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: currentFilter === 'favorites' ? 'bold' : 'normal',
              background: currentFilter === 'favorites' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: currentFilter === 'favorites' ? 'var(--primary)' : 'var(--text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <span>⭐ Только избранное ({favorites.length})</span>
            {currentFilter === 'favorites' && <span style={{ fontSize: '0.75rem' }}>✓</span>}
          </li>
        </ul>
      </div>
    </aside>
  );
}