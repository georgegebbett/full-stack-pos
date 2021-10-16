import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function ChangeDialog(props) {
  const history = useHistory();

  return (
    <Dialog open={props.dialogOpen} onClose={props.handleClose}>
      <DialogTitle>Change amount</DialogTitle>
      <DialogContent>
        <Typography variant="h2">
          £{props.changeAmount}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
