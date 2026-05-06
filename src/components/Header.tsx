import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <nav>
        <Link to="/" style={{ marginRight: '1rem' }}>Логотип</Link>
        <Link to="/hub" style={{ marginRight: '1rem' }}>Промпт-хаб</Link>
        <Link to="/knowledge" style={{ marginRight: '1rem' }}>База знаний</Link>
        <Link to="/templates" style={{ marginRight: '1rem' }}>Готовые шаблоны</Link>
        <Link to="/profile">Личный кабинет</Link>
      </nav>
      <SearchBar />
    </header>
  );
}