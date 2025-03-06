import React from 'react';

import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/hooks/useAppSelector';

import { useTheme } from '../themeContext/UseTheme';

import './DetailView.module.css';

interface DetailViewProps {
  onClose(): void;
}

const DetailView = ({ onClose }: DetailViewProps) => {
  const { theme } = useTheme();
  const detail = useAppSelector((state) => state.details.person);

  if (!detail) {
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
