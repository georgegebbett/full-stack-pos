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
  CircularProgress,
  FormControl
} from '@mui/material';
import PropTypes from 'prop-types';

function EditLayoutDialog(props) {
  const [layoutName, setLayoutName] = useState('');
  const [layoutCategory, setLayoutCategory] = useState('');
  const [layoutPrice, setLayoutPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    layoutId, handleClose, handleCancel, dialogOpen, layouts
  } = props;

  useEffect(() => {
    const setCurrentLayout = async () => {
      setLoading(true);
      const currentLayout = layouts.find(layout => layout._id === layoutId);
      setLayoutName(currentLayout.name);
      setLayoutCategory(currentLayout.category);
      setLayoutPrice(currentLayout.price);
      setLoading(false);
    };

    setCurrentLayout();
  }, [layoutId]);

  const updateLayout = () => {
    axios.put(`/api/layouts/${layoutId}`, {
      name: layoutName,
      category: layoutCategory,
      price: layoutPrice
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
      {(loading
        ? <CircularProgress /> : (
          <React.Fragment>
            <DialogTitle>Edit layout</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update layout details
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
                  defaultValue={layoutName}
                  onChange={event => setLayoutName(event.target.value)}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={updateLayout}>Update Layout</Button>
            </DialogActions>
          </React.Fragment>
        ))}
    </Dialog>
  );
}

EditLayoutDialog.propTypes = {
  layoutId: PropTypes.string.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  layouts: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object)
};

EditLayoutDialog.defaultProps = {
  categories: [],
  layouts: []
};

export default EditLayoutDialog;
