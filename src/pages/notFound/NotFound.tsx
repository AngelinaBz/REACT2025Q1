import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <img src="./gif.gif" alt="gif" />
      <h1>404 Error</h1>
      <h2>Page not found</h2>
      <Link to="/search">
        <button>Try again</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
