import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { unselectAllItems } from '../../redux/slices/selectedSlice';
import { useTheme } from '../themeContext/UseTheme';
import './Flyout.css';

const Flyout: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const downloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      selectedPeople
        .map(
          (person) =>
            `${person.id},${person.name},${person.gender},${person.url}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${selectedPeople.length}_starwarspeople.csv`
    );
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flyout flyout-${theme}`}>
      {selectedPeople.length > 0 && (
        <div className="selected-container">
          <p>{selectedPeople.length} selected items</p>
          <button className={`button-${theme}`} onClick={handleUnselectAll}>
            Unselect all
          </button>
          <button className={`button-${theme}`} onClick={downloadCSV}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Flyout;
