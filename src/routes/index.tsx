import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import HubPage from '../pages/HubPage';
import EditorPage from '../pages/EditorPage';
import KnowledgePage from '../pages/KnowledgePage';
import ResearchPage from '../pages/ResearchPage';
import TemplatesPage from '../pages/TemplatesPage';
import ProfilePage from '../pages/ProfilePage';
import MyTemplatesPage from '../pages/MyTemplatesPage';
import FavoritesPage from '../pages/FavoritesPage';
import SearchPage from '../pages/SearchPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hub" element={<HubPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/knowledge" element={<KnowledgePage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/my-templates" element={<MyTemplatesPage />} />
      <Route path="/profile/favorites" element={<FavoritesPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}