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

export default function ProfileForCompany() {
  const [projectList, setProjectList] = useState(null);

  const showProjects = async () => {
    try {
      const projectsList = await getProjectsList();
      const companyId = getCompanyId();
      const currentCompanyProjects = getCurrentCompanyProjects(projectsList, companyId);
      console.log('currentCompanyProjects:', currentCompanyProjects);
      setProjectList(Object.values(currentCompanyProjects) || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // тянуть данные из stora, если их  нет то выполить запрос на сервер и записываю в store
    //  пока он всегда тянет актуальные данные

    if (!!!projectList) {
      // если projectsList пустой,то выполнится. А он и так пустой, потому что его иници
      showProjects();
    }
  }, [projectList]);

  const getProjectsList = async () => {
    let listOfProjectsFetched = [];
    await firebase
      .database()
      .ref('users/')
      .orderByChild('userType')
      .equalTo('project')
      .once('value', (snap) => {
        const entitiesFetched = snap.val();
        listOfProjectsFetched = Object.values(entitiesFetched);

        console.log('listOfProjectsFetched:', listOfProjectsFetched);
      });
    return listOfProjectsFetched;
  };

  const getCompanyId = () => {
    //Todo: брать со stora
    console.log('companyId:', JSON.parse(localStorage.getItem('Entity')).id);
    return JSON.parse(localStorage.getItem('Entity')).id; // Todo: JSON.parse
  };

  const getCurrentCompanyProjects = (projectList, companyId) => {
    console.log('projectsListForFiltering:', projectList);
    console.log('companyIdForfiltering:', companyId);
    return projectList.filter((element) => element.id_company === companyId) || console.log('No Current Projects');
  };

  // Ниже представлен код для отрисовки всплывающей формы

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const {handleSubmit, values} = useFormik({
    initialValues: {
      //companyName: '',
      projectName: '',
      description: '',
      deadlines: '',
      stack: '',
    },
    onSubmit: async () => {
      try {
        await createEntityInRealTimeDataBase();
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
        {projectList?.map((el) => {
          return <li>{el?.id || 'Your company has no any projects'}</li>;
        })}
      </ul>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new project
      </Button>

      {/*<form onSubmit={handleSubmit}>*/}
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
            value={values.projectName}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            fullWidth
            value={values.description}
          />

          <TextField autoFocus margin="dense" id="deadlines" label="deadlines" fullWidth value={values.deadlines} />

          <TextField autoFocus margin="dense" id="stack" label="stack" fullWidth value={values.stack} />
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
      {/*      </form>*/}
    </>
  );
}
