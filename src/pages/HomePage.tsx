import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="form-container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--gradient)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        🧠 PromptHub
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Создавайте, храните и делитесь идеальными промптами для языковых моделей
      </p>

      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <Link to="/hub">
          <button className="btn" style={{ minWidth: '180px' }}>📚 Перейти в каталог</button>
        </Link>
        <Link to="/templates">
          <button className="btn" style={{ minWidth: '180px' }}>📋 Готовые шаблоны</button>
        </Link>
        <Link to="/knowledge">
          <button className="btn" style={{ minWidth: '180px' }}>📖 База знаний</button>
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        textAlign: 'left'
      }}>
        <div className="card" style={{ padding: '1rem' }}>
          <h3>✏️ Редактор промптов</h3>
          <p style={{ fontSize: '0.875rem' }}>Подсветка синтаксиса, переменные, CAPS-акценты</p>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <h3>🔍 Умный поиск</h3>
          <p style={{ fontSize: '0.875rem' }}>Подсказки, фильтры по тегам и избранному</p>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <h3>⭐ Избранное</h3>
          <p style={{ fontSize: '0.875rem' }}>Сохраняйте лучшие промпты</p>
        </div>
      </div>
    </div>
  );
}