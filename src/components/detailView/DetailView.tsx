import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useTheme } from '../themeContext/UseTheme';

import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/hooks/useAppSelector';
import './DetailView.module.css';

interface DetailViewProps {
  personId: string;
  onClose(): void;
}

const DetailView = ({ personId, onClose }: DetailViewProps) => {
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
          <img
            className="detail-view__image"
            src={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`}
            alt={detail.name || 'Unknown character'}
          ></img>
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
