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

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

function toFixed(num, fixed) {
  const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}


export default function Tables() {
  const auth = useAuth();
  const [tables, setTables] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get('/api/tables');
    setTables(data);
  });

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
                  £{toFixed(table.totalPrice, 2)}
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
