import ControlledForm from '../../components/controlled-form/controlled-form';
import Header from '../../components/header/header';
import './controlled-page.css';

const ControlledPage = () => {
  return (
    <div className="controlled-page">
      <Header />
      <ControlledForm></ControlledForm>
    </div>
  );
};

export default ControlledPage;
