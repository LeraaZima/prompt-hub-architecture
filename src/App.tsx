import { BrowserRouter, useLocation } from 'react-router-dom';
import { PromptProvider } from './context/PromptContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import SkipLink from './components/SkipLink';

function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname === '/hub';

  return (
    <div className="app-wrapper">
      <SkipLink />
      <Header />
      <div className="main-content fade-in-up">
        <div style={{ display: 'flex', gap: '2rem' }}>
          {showSidebar && (
            <div style={{ width: '280px', flexShrink: 0 }}>
              <Sidebar />
            </div>
          )}
          <main id="main-content" style={{ flex: 1 }}>
            <AppRoutes />
          </main>
        </div>
      </div>
      <Footer />
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