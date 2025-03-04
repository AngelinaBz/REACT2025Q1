import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/hooks/useAppSelector';

import { useTheme } from '../themeContext/UseTheme';
import './DetailView.module.css';

interface DetailViewProps {
  onClose(): void;
}

const DetailView = ({ onClose }: DetailViewProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const detail = useAppSelector((state) => state.details.person);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const routeStart = () => setLoading(true);
    const routeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', routeStart);
    router.events.on('routeChangeComplete', routeComplete);

    return () => {
      router.events.off('routeChangeStart', routeStart);
      router.events.off('routeChangeComplete', routeComplete);
    };
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {detail && (
        <div className="detail-view">
          <h2 className="detail-view__name">{detail.name}</h2>
          <p className="detail-view__information">Gender: {detail.gender}</p>
          <p className="detail-view__information">
            Birth Year: {detail.birth_year}
          </p>
          <button className={`button-${theme}`} onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default DetailView;
