'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { DetailPersonResponse } from '@/utils/types';

import { useTheme } from '../themeContext/UseTheme';
import './DetailView.module.css';

interface DetailsProps {
  details: DetailPersonResponse | null;
}

const DetailView = ({ details }: DetailsProps) => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    router.push(`/search/pages?${params.toString()}`);
  };

  return (
    <>
      {details && (
        <div className="detail-view">
          <h2 className="detail-view__name">{details.name}</h2>
          <p className="detail-view__information">Gender: {details.gender}</p>
          <p className="detail-view__information">
            Birth Year: {details.birth_year}
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
