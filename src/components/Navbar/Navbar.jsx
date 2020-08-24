import React from 'react'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import store, {signOut} from '../../old_store/store'

const Nav = () =>{
    const isAuth = useSelector(store=>store.user.isAuth)
        return  <nav className={classes.nav}>
        <div className={classes.item}>
            {!isAuth ? <NavLink to='/signIn' activeClassName={classes.activeLink}>Войти</NavLink>:''}
            { isAuth ? <NavLink onClick={()=>store.dispatch(signOut())} to='/signIn' activeClassName={classes.activeLink}>Выйти</NavLink>:''}

        </div>
    </nav>
}

export default Nav;


