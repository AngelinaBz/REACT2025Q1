import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found';
import { ROUTES } from './routes/routes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
