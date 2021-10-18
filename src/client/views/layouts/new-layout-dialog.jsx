import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';

function NewLayoutDialog(props) {
  const [newLayoutName, setNewLayoutName] = useState('');

  const { dialogOpen, handleClose, handleCancel } = props;

  const createNewLayout = () => {
    axios.post('/api/layouts', {
      name: newLayoutName
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
    <Dialog open={dialogOpen} onClose={handleCancel}>
      <DialogTitle>Add new layout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter new layout details
        </DialogContentText>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={event => setNewLayoutName(event.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={createNewLayout}>Add Layout</Button>
      </DialogActions>
    </Dialog>
  );
}

NewLayoutDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired
};

export default NewLayoutDialog;
