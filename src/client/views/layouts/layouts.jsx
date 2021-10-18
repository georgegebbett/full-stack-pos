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
import { Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NewLayoutDialog from './new-layout-dialog';
import EditLayoutDialog from './edit-layout-dialog';
import { useAuth } from '../../controllers/use-auth';


export default function Layouts() {
  const [layouts, setLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLayoutDialogOpen, setNewLayoutDialogOpen] = useState(false);
  const [editLayoutDialogOpen, setEditLayoutDialogOpen] = useState(false);
  const [editingLayoutId, setEditingLayoutId] = useState('');
  const [dataRefreshing, setDataRefreshing] = useState(false);


  useEffect(() => {
    const getServerLayouts = async () => {
      setLoading(true);
      const { data } = await axios.get('/api/layouts');
      setLayouts(data);
      setLoading(false);
    };

    getServerLayouts();
  }, [dataRefreshing]);

  const refreshData = () => {
    setDataRefreshing(!dataRefreshing);
  };

  const deleteLayout = (layoutId) => {
    setLoading(true);
    axios.delete(`/api/layouts/${layoutId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        refreshData();
      });
  };

  const handleEditItemDialogOpen = (layoutId) => {
    setEditingLayoutId(layoutId);
    setEditLayoutDialogOpen(true);
  };


  const handleClickOpen = () => {
    console.log('Handle open called');
    setNewLayoutDialogOpen(true);
  };

  const handleNewLayoutDialogClose = () => {
    console.log('New layout dialog close called');
    setNewLayoutDialogOpen(false);
    refreshData();
  };

  const handleEditLayoutDialogClose = () => {
    console.log('Edit layout dialog close called');
    setEditLayoutDialogOpen(false);
    refreshData();
  };

  const handleCancel = () => {
    setEditLayoutDialogOpen(false);
    setNewLayoutDialogOpen(false);
  };

  const auth = useAuth();

  return (
    (loading ? (
      <CircularProgress />
    ) : (
      <TableContainer component={Paper}>
        <NewLayoutDialog
          dialogOpen={newLayoutDialogOpen}
          handleClose={handleNewLayoutDialogClose}
          handleCancel={handleCancel}
        />
        <EditLayoutDialog
          dialogOpen={editLayoutDialogOpen}
          handleClose={handleEditLayoutDialogClose}
          handleCancel={handleCancel}
          layoutId={editingLayoutId}
          layouts={layouts}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="itemTable">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rename</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {layouts.map(layout => (
              <TableRow
                key={layout._id}
                id={layout._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {layout.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    disabled={(!auth.user.permissions.includes('layout:write'))}
                    onClick={(event) => {
                      handleEditItemDialogOpen(event.target.parentElement.parentElement.id);
                    }}
                  >
                    Rename
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    disabled={(!auth.user.permissions.includes('layout:write'))}
                    component={RouterLink}
                    to={`/layouts/${layout._id}/edit`}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    disabled={(!auth.user.permissions.includes('layout:write'))}
                    onClick={(event) => {
                      deleteLayout(event.target.parentElement.parentElement.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {(auth.user.permissions.includes('layout:write')
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
