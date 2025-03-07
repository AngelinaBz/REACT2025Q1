import React, { ReactNode } from 'react';

import Flyout from '@/components/flyout/Flyout';
import Search from '@/components/search/Search';

const Layout = ({ children }: { children: ReactNode }): React.ReactNode => {
  return (
    <div className={`app`}>
      <Search />
      <div className="main-container">{children}</div>
      <Flyout />
    </div>
  );
};

export default Layout;
