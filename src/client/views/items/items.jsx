import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SuccessToast from './success-message';
import NewItemDialog from './new-item-dialog';
import EditItemDialog from './edit-item-dialog';

import './items.css';
import { useAuth } from '../../controllers/use-auth';
import { currencyFormatter } from '../../controllers/currencyFormatter';

export default function Items() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerItem, setBannerItem] = useState('');
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editItemDialogOpen, setEditItemDialogOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState('');
  const [dataRefreshing, setDataRefreshing] = useState(false);

  const closeBanner = () => {
    setBannerOpen(false);
  };

  useEffect(() => {
    const getServerItems = async () => {
      setLoading(true);
      const { data } = await axios.get('/api/items');
      setItems(data);
      const cats = await axios.get('/api/items/categories');
      setCategories(cats.data);
      setLoading(false);
    };

    getServerItems();
  }, [dataRefreshing]);

  const refreshData = () => {
    setDataRefreshing(!dataRefreshing);
  };

  const deleteItem = (itemId) => {
    setLoading(true);
    axios.delete('/api/items', { data: { itemId } })
      .then((res) => {
        console.log(res);
        setBannerOpen(true);
        setBannerItem(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        refreshData();
      });
  };

  const handleEditItemDialogOpen = (itemId) => {
    setEditingItemId(itemId);
    setEditItemDialogOpen(true);
  };


  const handleClickOpen = () => {
    console.log('Handle open called');
    setNewItemDialogOpen(true);
  };

  const handleNewItemDialogClose = () => {
    console.log('New item dialog close called');
    setNewItemDialogOpen(false);
    refreshData();
  };

  const handleEditItemDialogClose = () => {
    console.log('Edit item dialog close called');
    setEditItemDialogOpen(false);
    refreshData();
  };

  const handleCancel = () => {
    setEditItemDialogOpen(false);
    setNewItemDialogOpen(false);
  };

  const auth = useAuth();

  return (
    (loading ? (
      <CircularProgress />
    ) : (
      <TableContainer component={Paper}>
        <NewItemDialog
          dialogOpen={newItemDialogOpen}
          handleClose={handleNewItemDialogClose}
          handleCancel={handleCancel}
          categories={categories}
        />
        <EditItemDialog
          dialogOpen={editItemDialogOpen}
          handleClose={handleEditItemDialogClose}
          handleCancel={handleCancel}
          itemId={editingItemId}
          categories={categories}
          items={items}
        />
        <SuccessToast open={bannerOpen} handleClose={closeBanner} bannerItem={bannerItem} />
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="itemTable">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => (
              <TableRow
                key={row._id}
                id={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{currencyFormatter.format(row.price / 100)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    disabled={(!auth.user.permissions.includes('item:write'))}
                    onClick={(event) => {
                      handleEditItemDialogOpen(event.target.parentElement.parentElement.id);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    disabled={(!auth.user.permissions.includes('item:write'))}
                    onClick={(event) => {
                      deleteItem(event.target.parentElement.parentElement.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {(auth.user.permissions.includes('item:write')
          ? (
            <Fab onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
          )
          : null
          )}

      </TableContainer>
    ))
  );
}
