import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <div>Page is not found...</div>
      <NavLink to="/" className={s.navLink}>
        Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
