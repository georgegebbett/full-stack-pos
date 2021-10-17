import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';


function TenderAmountDialog(props) {
  const [tenderAmount, setTenderAmount] = useState(0);
  const { tableId } = useParams();
  const history = useHistory();

  const {
    remainingValue, handleClose, handleCloseWithChange, tenderType, dialogOpen
  } = props;

  useEffect(() => {
    setTenderAmount(remainingValue);
  }, [remainingValue]);

  const postTenderToTableApi = () => {
    axios.post(`/api/tables/${tableId}/tender`, {
      tenderType,
      tenderAmount
    })
      .then((res) => {
        if (res.data['table closed'].changeGiven) {
          handleCloseWithChange(res.data['table closed'].change);
        } else {
          handleClose();
          history.push('/tables');
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        handleClose();
      });
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
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
            defaultValue={(remainingValue / 100)}
            onChange={event => setTenderAmount((event.target.value * 100))}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={postTenderToTableApi}>Confirm Tender</Button>
      </DialogActions>
    </Dialog>
  );
}

TenderAmountDialog.propTypes = {
  remainingValue: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseWithChange: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  tenderType: PropTypes.string.isRequired
};


export default TenderAmountDialog;
