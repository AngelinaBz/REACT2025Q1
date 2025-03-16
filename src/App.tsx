import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ControlledPage from './pages/controlled-page/controlled-page';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import UncontrolledPage from './pages/uncontrolled-page/uncontrolled-page';
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
