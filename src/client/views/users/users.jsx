import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../controllers/use-auth';
import { Button } from '@mui/material';
import NewUserDialog from './new-user-dialog';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function createData(name, username) {
  return { name, username };
}



export default function Users() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const handleClickOpen = () => {
    console.log('Handle open called');
    setDialogOpen(true);
  };

  const handleClose = () => {
    console.log('Handle close called');
    setDialogOpen(false);
    refreshTable();
  };

  useEffect( () => {
    const fetchUserData = async () => {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    };
    fetchUserData();
    console.log(users);
  },[refreshData]);

  const refreshTable = () => {
    setRefreshData(!refreshData);
  };

  const deleteUser = (userId) => {
    axios.delete(`/api/users/${userId}`)
      .then((res) => {
        console.log(res);
        refreshTable();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TableContainer component={Paper}>
      <NewUserDialog dialogOpen={dialogOpen} handleClose={handleClose} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Roles</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.roles.toString()}</TableCell>
              <TableCell align="right"><Button variant="contained">Edit</Button></TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="error"
                  id={row._id}
                  onClick={event => deleteUser(event.target.id)}
                  disabled={(auth.user.user === row.username)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </TableContainer>
  );
}
