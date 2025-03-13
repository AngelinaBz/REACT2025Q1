import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ControlledPage from './pages/ControlledPage/ControlledPage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import UncontrolledPage from './pages/UncontrolledPage/UncontrolledPage';
import { ROUTES } from './routes/routes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.UNCONTROLLED} element={<UncontrolledPage />} />
        <Route path={ROUTES.CONTROLLED} element={<ControlledPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
