import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { unselectAllItems } from '../../redux/slices/selectedSlice';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const downloadCSV = () => {};

  return (
    <div className="flyout">
      {selectedPeople.length > 0 && (
        <div>
          <p>{selectedPeople.length} selected items</p>
          <button onClick={handleUnselectAll}>Unselect all</button>
          <button onClick={downloadCSV}>Download</button>
        </div>
      )}
    </div>
  );
};

export default Flyout;
