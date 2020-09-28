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
import {useDispatch, useSelector} from 'react-redux';
import {setCompanyProjectsList} from '../../store/company/actions';

export default function ProfileForCompany() {
  const projectsList = useSelector((rootStore) => rootStore.company.companyProjects);
  const userAuth = useSelector((rootStore) => rootStore.session.authUser);

  const dispatch = useDispatch();

  const showProjects = async () => {
    try {
      const projectsList = await getProjectsList();
      const companyId = getCompanyId();
      const currentCompanyProjects = getCurrentCompanyProjects(projectsList, companyId);
      dispatch(setCompanyProjectsList(currentCompanyProjects));
    } catch (e) {
      console.error(e);
    }
  };

  const [deleteButtonToggle, setDeleteButtonToggle] = useState(false);

  useEffect(() => {
    if (!!!projectsList) {
      console.log('useEffect сработал.......');
      showProjects();
    }

    if (deleteButtonToggle) {
      console.log('ready to delete!');
    }
  }, [projectsList, userAuth, deleteButtonToggle]);

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
        }
      });
    return listOfProjectsFetched;
  };

  const getCompanyId = () => {
    return userAuth.id;

    //
  };

  const getCurrentCompanyProjects = (projectsList, companyId) => {
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

  const companyId = userAuth.id;

  const handleCloseProject = async (idx) => {
    setDeleteButtonToggle(true);
    const currentCompanyProjects = getCurrentCompanyProjects(projectsList, companyId);
    await firebase.database().ref('users/').child(currentCompanyProjects[idx].id).remove();
    showProjects();
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
      projectName: '',
      description: '',
      deadlines: '',
      stack: '',
    },
    onSubmit: async () => {
      try {
        //создание в firebase
        const newEntity = await createEntityInRealTimeDataBase();

        dispatch(setCompanyProjectsList(newEntity));

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
              <Button variant="outlined" color="primary" onClick={() => handleCloseProject(idx)}>
                Close the project
              </Button>
            </li>
          );
        })}
      </ul>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new project
      </Button>

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
