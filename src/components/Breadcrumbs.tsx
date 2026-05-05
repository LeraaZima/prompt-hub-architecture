import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav style={{ padding: '0.5rem', background: '#f5f5f5' }}>
      <Link to="/">Главная</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={name}> / {decodeURIComponent(name)}</span>
        ) : (
          <Link key={name} to={routeTo}> / {decodeURIComponent(name)}</Link>
        );
      })}
    </nav>
  );
}