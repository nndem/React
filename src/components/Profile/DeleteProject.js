import React from 'react';
import {useSelector} from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

export default function DeleteProject() {
  const companyProjects = useSelector((rootStore) => rootStore.company.companyProjects);

  return (
    <>
      <FormControl>
        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          //value={personName}
          //onChange={handleChange}
          input={<Input />}
          //MenuProps={MenuProps}
        >
          {companyProjects.map((project) => (
            <MenuItem key={project} value={project}>
              {project}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
