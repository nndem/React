import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {LogOut} from '../../store/sessionStore';

const Nav = () => {
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
  const userType = useSelector((rootStore) => rootStore.session.userType);
  const dispatch = useDispatch();

  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        {!isAuth ? (
          <NavLink to="/LogIn" activeClassName={classes.activeLink}>
            Войти
          </NavLink>
        ) : (
          <NavLink
            to="/"
            activeClassName={classes.activeLink}
            onClick={() => {
              dispatch(LogOut());
            }}
          >
            Выйти
          </NavLink>
        )}

        {!isAuth ? (
          <NavLink to="/SignUp" activeClassName={classes.activeLink}>
            Зарегистрироваться
          </NavLink>
        ) : (
          ''
        )}
        <NavLink to="/" activeClassName={classes.activeLink}>
          Стартовая страница
        </NavLink>
        {isAuth &&
          (userType === 'developer' ? (
            <NavLink to="/Home" activeClassName={classes.activeLink}>
              Список проектов
            </NavLink>
          ) : (
            <NavLink to="/Home" activeClassName={classes.activeLink}>
              Список разработчиков
            </NavLink>
          ))}
      </div>
    </nav>
  );
};

export default Nav;
