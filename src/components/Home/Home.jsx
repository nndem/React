import React from 'react'
import {useSelector} from 'react-redux'
import InfoForDevelopers from './InfoForDevelopers/InfoForDevelopers'
import InfoForCompanies from './InfoForCompanies/InfoForCompanies'
import store from '../../old_store/store'



const Home = () => {
    const userType = useSelector(store => store.user.userType)
    const isAuth = useSelector(store => store.user.isAuth)
    //{console.log('STORE GETSATE():',store.getState())}

    return (
        <div>
            {console.log(store.getState())}
            {!isAuth ? "Войдите в систему" :
            userType ==="developer"?<InfoForDevelopers/>:<InfoForCompanies/>}</div>
    )


}

export default Home;
