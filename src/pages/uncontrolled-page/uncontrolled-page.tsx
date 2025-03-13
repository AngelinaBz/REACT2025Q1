import Header from '../../components/header/header';
import UncontrolledForm from '../../components/uncontrolled-form/uncontrolled-form';
import './uncontrolled-page.css';

const UncontrolledPage = () => {
  return (
    <div className="uncontrolled-page">
      <Header />
      <UncontrolledForm></UncontrolledForm>
    </div>
  );
};

export default UncontrolledPage;
