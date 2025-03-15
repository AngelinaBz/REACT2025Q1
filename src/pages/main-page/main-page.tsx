import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/card/card';
import Header from '../../components/header/header';
import { clearLastAddedDataId } from '../../redux/slices/form-slice';
import { RootState } from '../../redux/store';
import './main-page.css';

const MainPage = () => {
  const controlledData = useSelector(
    (state: RootState) => state.formData.controlledFormData
  );
  const uncontrolledData = useSelector(
    (state: RootState) => state.formData.uncontrolledFormData
  );
  const lastAddedId = useSelector(
    (state: RootState) => state.formData.lastAddedDataId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastAddedId) {
      const timer = setTimeout(() => {
        dispatch(clearLastAddedDataId());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastAddedId, dispatch]);

  return (
    <div>
      <Header />
      <div className="forms-container">
        <div className="controlled-forms">
          <h2>Controlled Form Data</h2>
          {controlledData.length > 0 ? (
            controlledData.map((data) => (
              <Card
                key={data.id}
                data={data}
                isLastAdded={data.id === lastAddedId}
              />
            ))
          ) : (
            <p>No controlled form data available</p>
          )}
        </div>
        <div className="uncontrolled-forms">
          <h2>Uncontrolled Form Data</h2>
          {uncontrolledData.length > 0 ? (
            uncontrolledData.map((data) => (
              <Card
                key={data.id}
                data={data}
                isLastAdded={data.id === lastAddedId}
              />
            ))
          ) : (
            <p>No uncontrolled form data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
