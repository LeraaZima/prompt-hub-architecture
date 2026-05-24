import { BrowserRouter, useLocation } from 'react-router-dom';
import { PromptProvider } from './context/PromptContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import SkipLink from './components/SkipLink';
import ThemeToggle from './components/ThemeToggle';
import { useState } from 'react';

function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname === '/hub';
  const [sidebarFilter, setSidebarFilter] = useState('all');
  const [sidebarTag, setSidebarTag] = useState('all');

  return (
    <div className="app-wrapper">
      <SkipLink />
      <Header />
      <div className="main-content fade-in-up">
        <div style={{ display: 'flex', gap: '2rem' }}>
          {showSidebar && (
            <div style={{ width: '280px', flexShrink: 0 }}>
              <Sidebar 
                onFilterChange={setSidebarFilter}
                onTagSelect={setSidebarTag}
                selectedTag={sidebarTag}
                currentFilter={sidebarFilter}
              />
            </div>
          )}
          <main id="main-content" style={{ flex: 1 }}>
            <AppRoutes sidebarFilter={sidebarFilter} sidebarTag={sidebarTag} />
          </main>
        </div>
      </div>
      <Footer />
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PromptProvider>
          <Layout />
        </PromptProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;