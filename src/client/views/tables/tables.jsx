import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../controllers/use-auth';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { currencyFormatter } from '../../controllers/currencyFormatter';

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

export default function Tables() {
  const auth = useAuth();
  const [tables, setTables] = useState([]);

  useEffect(() => {

    const getTableData = async () => {
      const { data } = await axios.get('/api/tables?open=true');
      setTables(data);
    };

    getTableData();
  }, []);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Table Number</TableCell>
              <TableCell align="right">Current Total</TableCell>
              <TableCell align="right">Order Entry</TableCell>
              <TableCell align="right">Tender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map(table => (
              <TableRow
                key={table._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {table.tableNumber}
                </TableCell>
                <TableCell align="right">
                  {currencyFormatter.format(table.totalPrice / 100)}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" component={RouterLink} to={`/tables/${table._id}/order`}>Order Entry</Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="warning"
                    id={table._id}
                    component={RouterLink}
                    to={`/tables/${table._id}/tender`}
                    disabled={(table.totalPrice === 0)}
                  >
                    Tender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
