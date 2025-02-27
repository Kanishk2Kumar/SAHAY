import Header from '@/components/Header';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="mx-12">
        <Header />
        <div className=" pb-10">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
