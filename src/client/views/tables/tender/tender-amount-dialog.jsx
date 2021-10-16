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



export default function TenderAmountDialog(props) {
  const [tenderAmount, setTenderAmount] = useState(0.0);
  const { tableId } = useParams();
  const history = useHistory();


  const postTenderToTableApi = () => {
    axios.post(`/api/tables/${tableId}/tender`, {
      tenderType: props.tenderType,
      tenderAmount
    })
      .then((res) => {
        if (res.data.success === 'table closed') {
          history.push('/tables');
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.handleClose();
      });
  };

  return (
    <Dialog open={props.dialogOpen} onClose={props.handleClose}>
      <DialogTitle>Set tender amount</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter tender amount
        </DialogContentText>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={event => setTenderAmount(event.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={postTenderToTableApi}>Confirm Tender</Button>
      </DialogActions>
    </Dialog>
  );
}
