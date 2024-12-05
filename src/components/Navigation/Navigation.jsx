import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { BiSolidMoviePlay } from 'react-icons/bi';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <header className={s.nav}>
      <BiSolidMoviePlay size="25px" />
      <nav className={s.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
