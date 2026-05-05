import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname === '/hub';

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <div style={{ display: 'flex' }}>
        {showSidebar && <Sidebar />}
        <main style={{ flex: 1, padding: '1rem' }}>
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;