import { Link, useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';

export default function MyTemplatesPage() {
  const { getMyPrompts, deletePrompt } = usePrompts();
  const navigate = useNavigate();
  const myPrompts = getMyPrompts();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Удалить промпт "${title}"?`)) {
      deletePrompt(id);
      alert('🗑️ Промпт удалён');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📄 Мои шаблоны</h1>
        <Link to="/editor">
          <button className="btn">➕ Создать новый шаблон</button>
        </Link>
      </div>
      
      {myPrompts.length === 0 ? (
        <div className="form-container" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '1rem' }}>
            У вас пока нет созданных промптов
          </p>
          <Link to="/editor">
            <button className="btn">Создать первый промпт</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {myPrompts.map((prompt) => (
            <div key={prompt.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{prompt.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {prompt.content.substring(0, 150)}...
                  </p>
                  {prompt.tags && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                      {prompt.tags.split(',').map((tag, i) => (
                        <span key={i} style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '20px', fontSize: '0.75rem' }}>
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>
                    {prompt.isPublic ? '🌍 Опубликован' : '🔒 Личный'} • {new Date(prompt.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    onClick={() => handleEdit(prompt.id)}
                  >
                    ✏️ Редактировать
                  </button>
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#ef4444', color: 'white', borderColor: '#ef4444' }}
                    onClick={() => handleDelete(prompt.id, prompt.title)}
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}