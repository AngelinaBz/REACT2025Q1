import { Link } from 'react-router-dom';

import { ROUTES } from '../../routes/routes';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404 Error</h1>
      <h2>Page not found</h2>
      <Link to={ROUTES.MAIN} className="not-found__link">
        Try again
      </Link>
    </div>
  );
};

export default NotFoundPage;
