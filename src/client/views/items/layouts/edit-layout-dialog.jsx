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
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import PropTypes from 'prop-types';

function EditLayoutDialog(props) {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    itemId, handleClose, handleCancel, dialogOpen, categories, items
  } = props;

  useEffect(() => {
    const setCurrentItem = async () => {
      setLoading(true);
      const currentItem = items.find(item => item._id === itemId);
      setItemName(currentItem.name);
      setItemCategory(currentItem.category);
      setItemPrice(currentItem.price);
      setLoading(false);
    };

    setCurrentItem();
  }, [itemId]);

  const updateItem = () => {
    axios.put(`/api/items/${itemId}`, {
      name: itemName,
      category: itemCategory,
      price: itemPrice
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
            <DialogTitle>Edit item</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update item details
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
                  defaultValue={itemName}
                  onChange={event => setItemName(event.target.value)}
                />
              </FormControl>
              <FormControl required fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  id="category-select"
                  labelId="category-select-label"
                  label="Category"
                  fullWidth
                  defaultValue={itemCategory}
                  onChange={event => setItemCategory(event.target.value)}
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
                  defaultValue={itemPrice / 100}
                  onChange={event => setItemPrice(event.target.value * 100)}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={updateItem}>Add Item</Button>
            </DialogActions>
          </React.Fragment>
        ))}
    </Dialog>
  );
}

EditLayoutDialog.propTypes = {
  itemId: PropTypes.string.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object)
};

EditLayoutDialog.defaultProps = {
  categories: [],
  items: []
};

export default EditLayoutDialog;
