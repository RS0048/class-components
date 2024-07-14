import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/notFoundPage/notFoundPage';
import HomePage from '../pages/homePage/homePage';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/product" replace />} />
      <Route path="/product" element={<HomePage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
