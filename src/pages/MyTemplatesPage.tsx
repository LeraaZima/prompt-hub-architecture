import { Link } from 'react-router-dom';

export default function MyTemplatesPage() {
  return (
    <div>
      <h1>Мои шаблоны</h1>
      <Link to="/editor">
        <button>Создать новый шаблон</button>
      </Link>
      <p>Здесь будет список ваших промптов.</p>
    </div>
  );
}