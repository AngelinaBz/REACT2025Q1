import { useRef } from 'react';

import { useTheme } from '../themeContext/UseTheme';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { unselectAllItems } from '@/redux/slices/selectedSlice';
import './Flyout.module.css';

const Flyout = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const downloadCSV = () => {
    if (downloadLinkRef.current === null) return;
    const link = downloadLinkRef.current;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      selectedPeople
        .map(
          (person) =>
            `${person.id},${person.name},${person.gender},${person.url}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${selectedPeople.length}_starwarspeople.csv`
    );

    link.click();
    link.removeAttribute('href');
    link.removeAttribute('download');
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
          <a ref={downloadLinkRef} href="#" />
        </div>
      )}
    </div>
  );
};

export default Flyout;
