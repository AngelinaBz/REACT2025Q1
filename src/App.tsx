import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import MainPage from './pages/main/Main';
import NotFoundPage from './pages/notFound/NotFound';
import { useTheme } from './components/themeContext/UseTheme';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Routes>
          <Route path="/" element={<Navigate replace to={'/search'} />} />
          <Route path="/search" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
