'use client';

import React from 'react';

import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/hooks/useAppSelector';

import { useTheme } from '../themeContext/UseTheme';

import './DetailView.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { DetailPersonResponse } from '@/utils/types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setDetails } from '@/redux/slices/detailsSlice';

interface DetailsProps {
  details: DetailPersonResponse | null;
}

const DetailView = ({ details }: DetailsProps) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state) => state.details.person);
  const searchParams = useSearchParams();
  const router = useRouter();

  if (details) {
    dispatch(setDetails(details));
  }

  if (!detail) {
    return <Loading />;
  }

  const onClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    router.push(`/search/?${params.toString()}`);
  };

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
