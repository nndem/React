import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {LogOut} from '../../store/session/actions';
import firebase from 'firebase';

const Nav = () => {
  const isAuth = useSelector((rootStore) => rootStore.session.isAuth);
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
              firebase
                .auth()
                .signOut()
                .then(() => console.log('STOP FIREBASE SESSION'))
                .catch(() => console.log('STOP FIREBASE SESSION ERROR'));
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
        {isAuth ? (
          <NavLink to="/infofordevelopers" activeClassName={classes.activeLink}>
            Список проектов
          </NavLink>
        ) : (
          ''
        )}
        {isAuth ? (
          <NavLink to="/infoforcompanies" activeClassName={classes.activeLink}>
            Список разработчиков
          </NavLink>
        ) : (
          ''
        )}
        {isAuth ? (
          <NavLink to="/profile" activeClassName={classes.activeLink}>
            Мой профиль )
          </NavLink>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
};

export default Nav;
