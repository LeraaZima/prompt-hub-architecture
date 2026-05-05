import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/" style={{ marginRight: '1rem' }}>Логотип</Link>
        <Link to="/hub" style={{ marginRight: '1rem' }}>Промпт-хаб</Link>
        <Link to="/knowledge" style={{ marginRight: '1rem' }}>База знаний</Link>
        <Link to="/templates" style={{ marginRight: '1rem' }}>Готовые шаблоны</Link>
        <Link to="/profile">Личный кабинет</Link>
      </nav>
    </header>
  );
}