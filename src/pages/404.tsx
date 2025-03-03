import Link from 'next/link';
import '@styles/404.module.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img src="./gif.gif" alt="NotFound-gif" />
      <h1>404 Error</h1>
      <h2>Page not found</h2>
      <Link href="/" className="not-found__link">
        Try again
      </Link>
    </div>
  );
};

export default NotFoundPage;
