import { useParams, useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { highlightPrompt } from '../utils/highlightPrompt';

export default function PromptDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { prompts, toggleFavorite, favorites } = usePrompts();
  const { copyToClipboard, copied } = useCopyToClipboard();

  const prompt = prompts.find(p => p.id === id);

  if (!prompt) {
    return (
      <div className="form-container" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Промпт не найден 😢</h2>
        <button className="btn" onClick={() => navigate('/hub')}>Вернуться в каталог</button>
      </div>
    );
  }

  const handleCopy = () => copyToClipboard(prompt.content);

  return (
    <div>
      <button onClick={() => navigate('/hub')} className="btn-secondary" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}>
        ← Назад к каталогу
      </button>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div style={{ flex: 1 }}>
            <h1>{prompt.title}{prompt.isDemo && <span className="tag demo-tag">DEMO</span>}</h1>
            <div style={{ marginBottom: '1rem' }}>
              {prompt.tags?.split(',').map((tag, i) => (
                <span key={i} className="tag" style={{ marginRight: '0.5rem', cursor: 'default' }}>#{tag.trim()}</span>
              ))}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: highlightPrompt(prompt.content) }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
            <button onClick={handleCopy} aria-label="Копировать" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
              {copied ? '✅' : '📋'}
            </button>
            <button onClick={() => toggleFavorite(prompt.id)} aria-label={favorites.includes(prompt.id) ? 'Удалить из избранного' : 'Добавить в избранное'} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
              {favorites.includes(prompt.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}