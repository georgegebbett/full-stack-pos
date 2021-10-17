import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function ChangeDialog(props) {
  const { dialogOpen, handleClose, changeAmount } = props;

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Change amount</DialogTitle>
      <DialogContent>
        <Typography variant="h2">
          £
          {(changeAmount / 100)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

ChangeDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  changeAmount: PropTypes.number.isRequired
};

export default ChangeDialog;
