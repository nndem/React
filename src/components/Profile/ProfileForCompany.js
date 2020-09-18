import React, {useEffect, useState} from 'react';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {DialogContentText} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import {useFormik} from 'formik';
import DeleteProject from './DeleteProject';
import {useDispatch, useSelector} from 'react-redux';
import {setCompanyProjectsList} from '../../store/company/actions';

export default function ProfileForCompany() {
  //const [projectsList, setProjectsList] = useState(null);

  const projectsList = useSelector((rootStore) => rootStore.company.companyProjects);

  const dispatch = useDispatch();

  const showProjects = async () => {
    try {
      const projectsList = await getProjectsList();
      console.log('await getProjectsList()', projectsList);
      console.log('projectsList11:', projectsList);
      const companyId = getCompanyId();
      const currentCompanyProjects = getCurrentCompanyProjects(projectsList, companyId);
      console.log('currentCompanyProjects:', currentCompanyProjects);

      // изменим локальный state
      //setProjectsList(Object.values(currentCompanyProjects) || []);

      //запишем в в глобальный state этот список projects, хотя можно было и немножечко раньше это сделать
      dispatch(setCompanyProjectsList(currentCompanyProjects));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // тянуть данные из stora, если их  нет то выполить запрос на сервер и записываю в store
    //  пока он всегда тянет актуальные данные
    //showProjects();   //todo: автоматически обновлять
    if (!!!projectsList) {
      console.log('useEffect сработал.......');
      // если projectsList пустой,то выполнится. А он и так пустой, потому что его иници
      showProjects();
    }
  }, [projectsList]);

  const getProjectsList = async () => {
    let listOfProjectsFetched = [];
    await firebase
      .database()
      .ref('users/')
      .orderByChild('userType')
      .equalTo('project')
      .once('value', (snap) => {
        const entitiesFetched = snap.val();
        if (entitiesFetched) {
          listOfProjectsFetched = Object.values(entitiesFetched);
          console.log('listOfProjectsFetched222:', listOfProjectsFetched);
        }
      });
    return listOfProjectsFetched;
  };

  const getCompanyId = () => {
    //Todo: брать со stora
    console.log('companyId:', JSON.parse(localStorage.getItem('Entity')).id);
    return JSON.parse(localStorage.getItem('Entity')).id;
  };

  //const projectsList = await getProjectsList();

  const getCurrentCompanyProjects = (projectsList, companyId) => {
    console.log('projectsListForFiltering:', projectsList);
    console.log('companyIdForFiltering:', companyId);
    return projectsList.filter((element) => element.id_company === companyId) || console.log('No Current Projects');
  };

  // Ниже представлен код для отрисовки всплывающей формы

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProj = () => {
    //editProject(); либо функция, либо компонента
    alert('Функция еще не определена');
  };

  const handleCloseProject = async () => {
    const projectsList = await getProjectsList();
    const companyId = getCompanyId();

    const currentCompanyProjects = getCurrentCompanyProjects(projectsList, companyId);
    //запишем в store этот список projects, хотя можно было и немножечко раньше это сделать
    dispatch(setCompanyProjectsList(currentCompanyProjects));
    return <DeleteProject />;
  };

  const handleCloseProj = async (idx) => {
    //alert(idx);
    const projectsList = await getProjectsList();
    const companyId = getCompanyId();
    const currentCompanyProjects = getCurrentCompanyProjects(projectsList, companyId);
    console.log('Project to be deleted:', currentCompanyProjects[idx].id);

    await firebase.database().ref('user/').child(currentCompanyProjects[idx].id).remove();

    alert('project has been deleted');

    //add confirm dialog

    //alert('Функция еще не определена'); //Todo: добавить функционал
  };

  const createEntityInRealTimeDataBase = async () => {
    const projectModel = {
      id: firebase.auth().currentUser.uid + 'project' + new Date().getUTCMilliseconds(), //Todo: придумать что-либо получше
      userType: 'project',
      companyName: JSON.parse(localStorage.getItem('Entity')).companyName,
      projectName: values.projectName,
      description: values.description,
      deadlines: values.deadlines,
      stack: values.stack,
      id_company: firebase.auth().currentUser.uid,
    };

    try {
      await firebase
        .database()
        .ref('users/' + projectModel.id)
        .set({...projectModel});
      console.log('Entity has been created');
    } catch (error) {
      console.error(error);
    }
  };

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      //companyName: '',
      projectName: '',
      description: '',
      deadlines: '',
      stack: '',
    },
    onSubmit: async () => {
      try {
        //создание в firebase
        const newEntity = await createEntityInRealTimeDataBase();

        //запись в локальный store
        //setProjectsList(newEntity);

        //запись в глобальный store
        dispatch(setCompanyProjectsList(newEntity));

        // подгрузка на свою страницу
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      {'Some information about company:\n' + JSON.parse(localStorage.getItem('Entity')).companyName}

      <ul>
        {'CURRENT COMPANY PROJECTS:'}
        {projectsList?.map((el, idx) => {
          return (
            <li>
              {el?.projectName}
              <Button variant="outlined" color="primary" onClick={handleEditProj}>
                Edit project
              </Button>
              <Button variant="outlined" color="primary" onClick={() => handleCloseProj(idx)}>
                Close the project
              </Button>
            </li>
          );
        })}
      </ul>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new project
      </Button>

      {/*      <Button variant="outlined" color="primary" onClick={handleCloseProject}>
        Close the project
      </Button>*/}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">SOME_TEXT</DialogTitle>
        <DialogContent>
          <DialogContentText>To add a new project's description, please fill the forms</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="projectName"
            fullWidth
            onChange={handleChange}
            value={values.projectName}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            fullWidth
            onChange={handleChange}
            value={values.description}
          />

          <TextField
            autoFocus
            margin="dense"
            id="deadlines"
            label="deadlines"
            fullWidth
            onChange={handleChange}
            value={values.deadlines}
          />

          <TextField
            autoFocus
            margin="dense"
            id="stack"
            label="stack"
            fullWidth
            onChange={handleChange}
            value={values.stack}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
