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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import SuccessToast from './success-message';

import './items.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerItem, setBannerItem] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeBanner = () => {
    setBannerOpen(false);
  };

  useEffect(async () => {
    const { data } = await axios.get('/api/items');
    setItems(data);
    setLoading(false);
    console.log(dialogOpen);
  });

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
        setLoading(false);
      });
  };


  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const NewItemDialog = () => (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose}>Cancel</Button>
        <Button onClick={() => handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    (loading ? (
      <Typography variant="h1">Loading!</Typography>
    ) : (
      <TableContainer component={Paper}>
        <NewItemDialog />
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
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right"><Button variant="contained">Edit</Button></TableCell>
                <TableCell align="right"><Button id={row._id} variant="contained" color="error" onClick={(event) => { deleteItem(event.target.id); }}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Fab onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </TableContainer>
    ))
  );
}
