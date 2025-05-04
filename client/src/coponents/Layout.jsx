import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav'; // Assuming Nav is in the same components folder
import { useLocation } from 'react-router-dom';

function Layout() {

  const location = useLocation()

  return (
    <> {/* Use Fragment or a single top-level element */}
      <div className="App flex flex-col items-center w-[23.5rem] mx-auto min-h-screen relative ">
        <Outlet /> {/* Child routes will render here */}
      </div>

      {!location.pathname.includes('/profile') && <Nav />}
      
    </>
  );
}

export default Layout;
