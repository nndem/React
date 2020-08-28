import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

const Nav = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);

  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        {!isAuth ? (
          <NavLink to="/LogIn" activeClassName={classes.activeLink}>
            Войти
          </NavLink>
        ) : (
          <NavLink to="/StartingPage" activeClassName={classes.activeLink}>
            Выйти
          </NavLink>
        )}

        {!isAuth ? (
          <NavLink to="/SignUp" activateClassName={classes.activeLink}>
            Зарегистрироваться
          </NavLink>
        ) : (
          ''
        )}
        <NavLink to="/" activateClassName={classes.activeLink}>
          Стартовая страница
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
