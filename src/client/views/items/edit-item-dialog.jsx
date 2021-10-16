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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function EditItemDialog(props) {
  const [categories, setCategories] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  useEffect(async () => {
    let serverCats = (await axios.get('/api/items/categories'));
    setCategories(serverCats.data);
  });

  const createNewItem = () => {
    axios.post('/api/items', {
      name: newItemName,
      category: newItemCategory,
      price: newItemPrice
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

  //TODO - this is not even nearly finished - atm it is just a rip off of the new item dialog

  return (
    <Dialog open={props.dialogOpen} onClose={props.handleClose} itemID={props.itemId}>
      <DialogTitle>Edit item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is where you can edit item ID {props.itemId}
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
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={createNewItem}>Add Item</Button>
      </DialogActions>
    </Dialog>
  );
}
