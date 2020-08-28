import React from 'react';
import {Button, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {LogOut} from '../../store/sessionStore';

{
  /*логика будет такая:
            если в LocalStorage: hasAccount=True и isAuth=True, то в зависимости от userType будет выводиться Home(либо InfoForCompanies, либо InfoForDevelopers)
            если в LocalStorage: hasAccount=True и isAuth=False, то будет выводиться LogIn
            если в LocalStorage: hasAccount=False, то будет выводиться SignUp

            Надо обратиться к LocalStorage
        */
}

const StartingPage = () => {
  return (
    <div>
      {'Summa ităque divisio de jure personārum haec est, quod omnes homĭnes aut libĕri sunt aut servi.' +
        ' Et libertas quidem est, ex qua etiam libĕri vocantur, naturālis facultas ejus, quod cuīque facĕre libet,' +
        ' nisi si quid aut vi aut jure prohibētur. Servĭtus autem est constitutio juris gentium,' +
        ' qua quis dominio aliēno contra natūram subicĭtur. Servi autem ex eo appellāti sunt,' +
        ' quod imperatōres captīvos vendĕre jubent ac per hoc servāre nес occidĕre solent: ' +
        'qui etiam mancipia dicti sunt, quod ab hostĭbus manu capiuntur. Servi autem aut nascuntur aut fiunt.' +
        ' Nascuntur ex ancillis nostris; fiunt aut jure gentium, id est ex captivitāte, aut jure civīli, velŭti,' +
        ' cum homo liber major viginti annis ad pretium participandum sese venumdāri passus est. ' +
        'In servōrum condiciōne nulla differentia est. In libĕris multae differentiae sunt: ' +
        'aut enim ingenui sunt aut libertīni.'}
    </div>
  );
};

export default StartingPage;
