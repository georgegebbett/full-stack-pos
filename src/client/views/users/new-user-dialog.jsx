import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup, FormLabel,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

function NewUserDialog(props) {
  const [roles, setRoles] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserRoles, setNewUserRoles] = useState({});
  const [newUserPassword, setNewUserPassword] = useState('');

  const { dialogOpen, handleClose } = props;

  useEffect(() => {
    const fetchServerRoles = async () => {
      const serverRoles = (await axios.get('/api/roles'));
      setRoles(serverRoles.data);
    };
    fetchServerRoles();
  }, []);

  const handleRoleChange = (roleName, changeEvent) => {
    console.log(roleName, changeEvent.target.checked);
    setNewUserRoles({
      ...newUserRoles,
      [roleName]: changeEvent.target.checked
    });
  };

  const createNewUser = () => {
    const rolesToSubmit = (roleObject) => {
      const roleArr = [];
      console.log(roleObject);
      for (const role in roleObject) {
        if (roleObject[role] === true) {
          roleArr.push(role);
        }
      }
      setNewUserRoles({});
      return roleArr;
    };

    axios.post('/api/users', {
      name: newUserName,
      username: newUserUsername,
      password: newUserPassword,
      roles: rolesToSubmit(newUserRoles)
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Add new user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter new user details
        </DialogContentText>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onChange={event => setNewUserName(event.target.value)}
          />
        </FormControl>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onChange={event => setNewUserUsername(event.target.value)}
          />
        </FormControl>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            autoComplete="off"
            onChange={event => setNewUserPassword(event.target.value)}
          />
        </FormControl>
        <FormLabel component="legend">Roles:</FormLabel>
        <FormGroup required id="roleGroup">
          {roles.map(role => (
            <FormControlLabel
              key={role._id}
              control={(
                <Checkbox
                  name={role.name}
                  className="roleCheckbox"
                  onChange={changeEvent => handleRoleChange(role.name, changeEvent)}
                />
              )}
              label={role.name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createNewUser}>Add User</Button>
      </DialogActions>
    </Dialog>
  );
}

NewUserDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired
};

export default NewUserDialog;
