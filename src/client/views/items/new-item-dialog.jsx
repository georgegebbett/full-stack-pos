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
import {
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import PropTypes from 'prop-types';

function NewItemDialog(props) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const { dialogOpen, handleClose, categories } = props;

  const createNewItem = () => {
    axios.post('/api/items', {
      name: newItemName,
      category: newItemCategory,
      price: (newItemPrice * 100)
    })
      .then((res) => {
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
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Add new item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter new item details
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
            onChange={event => setNewItemName(event.target.value)}
          />
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            id="category-select"
            labelId="category-select-label"
            label="Category"
            fullWidth
            onChange={event => setNewItemCategory(event.target.value)}
          >
            {categories.map(category => (
              <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={event => setNewItemPrice(event.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createNewItem}>Add Item</Button>
      </DialogActions>
    </Dialog>
  );
}

NewItemDialog.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired
};

NewItemDialog.defaultProps = {
  categories: []
};

export default NewItemDialog;
