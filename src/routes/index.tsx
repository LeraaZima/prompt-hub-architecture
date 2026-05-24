import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const HubPage = lazy(() => import('../pages/HubPage'));
const PromptDetailPage = lazy(() => import('../pages/PromptDetailPage'));
const EditorPage = lazy(() => import('../pages/EditorPage'));
const KnowledgePage = lazy(() => import('../pages/KnowledgePage'));
const ResearchPage = lazy(() => import('../pages/ResearchPage'));
const TemplatesPage = lazy(() => import('../pages/TemplatesPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const MyTemplatesPage = lazy(() => import('../pages/MyTemplatesPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));

function PageLoader() {
  return <div style={{ padding: '2rem', textAlign: 'center' }}>Загрузка...</div>;
}

interface AppRoutesProps {
  sidebarFilter?: string;
  sidebarTag?: string;
}

export default function AppRoutes({ sidebarFilter, sidebarTag }: AppRoutesProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/hub" 
          element={<HubPage sidebarFilter={sidebarFilter} sidebarTag={sidebarTag} />} 
        />
        <Route path="/hub/prompt/:id" element={<PromptDetailPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/my-templates" element={<MyTemplatesPage />} />
        <Route path="/profile/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Suspense>
  );
}