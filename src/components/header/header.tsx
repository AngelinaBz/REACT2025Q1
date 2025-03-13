import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../routes/routes';

const Header = () => {
  return (
    <nav className="header">
      <NavLink to={ROUTES.UNCONTROLLED}>Uncontrolled Form</NavLink>
      <NavLink to={ROUTES.CONTROLLED}>Controlled Form</NavLink>
    </nav>
  );
};

export default Header;
