import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="glass-header">
        <div className="container">
          <Link to="/" className="logo" aria-label="Главная">
            🧠 PromptHub
          </Link>
          <nav className="nav-links" aria-label="Основное меню">
            <Link to="/hub" className="nav-link">Промпт-хаб</Link>
            <Link to="/knowledge" className="nav-link">База знаний</Link>
            <Link to="/templates" className="nav-link">Шаблоны</Link>
            {isAuthenticated && (
              <Link to="/profile" className="nav-link">Профиль</Link>
            )}
          </nav>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <SearchBar />
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'white', fontSize: '0.875rem' }}>
                  👤 {user?.name}
                </span>
                <button
                  onClick={logout}
                  aria-label="Выйти"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '100px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                aria-label="Войти"
                style={{
                  background: 'var(--gradient)',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '100px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </header>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}