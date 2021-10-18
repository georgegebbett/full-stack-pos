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

function EditItemDialog(props) {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    itemId, handleClose, dialogOpen, categories
  } = props;

  useEffect(() => {
    const getServerData = async () => {
      setLoading(true);
      const currentItem = (await axios.get(`/api/items/${itemId}`));
      setItemName(currentItem.data.name);
      setItemCategory(currentItem.data.category);
      setItemPrice(currentItem.data.price);
      setLoading(false);
    };

    getServerData();
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
        props.handleClose();
      });
  };

  // TODO - this is not even nearly finished - atm it is just a rip off of the new item dialog

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
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
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={updateItem}>Add Item</Button>
            </DialogActions>
          </React.Fragment>
        ))}
    </Dialog>
  );
}

EditItemDialog.propTypes = {
  itemId: PropTypes.string.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object)
};

EditItemDialog.defaultProps = {
  categories: []
};

export default EditItemDialog;
