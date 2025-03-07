'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectItem, unselectItem } from '@/redux/slices/selectedSlice';
import { SelectedPerson } from '@/utils/types';

import './Card.module.css';

const Card = ({ id, name, gender, url }: SelectedPerson) => {
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );
  const dispatch = useAppDispatch();
  const isSelected = selectedPeople.some((person) => person.id === id);
  const handleCheckboxChange = () => {
    const personData = { id: id!, name, gender, url };
    if (isSelected) {
      dispatch(unselectItem(id!));
    } else {
      dispatch(selectItem(personData));
    }
  };

  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams?.toString());
  const detailPageLink = `/search/pages/${id}?${currentSearchParams.toString()}`;

  return (
    <section className="card-container">
      <Link key={id} href={detailPageLink}>
        <div className="card-information">
          <h2>{name}</h2>
          <p>{gender}</p>
        </div>
      </Link>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        readOnly
      />
    </section>
  );
};

export default Card;
