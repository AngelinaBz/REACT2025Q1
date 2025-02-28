import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { useTheme } from './components/themeContext/UseTheme';
import MainPage from './pages/main/Main';
import NotFoundPage from './pages/notFound/NotFound';
import { ROUTES } from './routes/routes';
import './App.css';

const App = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={<Navigate replace to={ROUTES.SEARCH} />}
          />
          <Route path={ROUTES.SEARCH} element={<MainPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
