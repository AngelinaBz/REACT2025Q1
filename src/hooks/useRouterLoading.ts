import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const useRouterLoading = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const routerStart = () => setLoading(true);
    const routerComplete = () => setLoading(false);

    router.events.on('routeChangeStart', routerStart);
    router.events.on('routeChangeComplete', routerComplete);

    return () => {
      router.events.off('routeChangeStart', routerStart);
      router.events.off('routeChangeComplete', routerComplete);
    };
  }, [router]);

  return isLoading;
};
