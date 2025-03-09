import Image from 'next/image';
import Link from 'next/link';

import '@/styles/404.module.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <Image src="/error.png" alt="NotFound-gif" width={120} height={120} />
      <h1>404 Error</h1>
      <h2>Page not found</h2>
      <Link href="/" className="not-found__link">
        Try again
      </Link>
    </div>
  );
};

export default NotFoundPage;
