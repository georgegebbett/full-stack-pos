import React, { useEffect, useState } from 'react';
import {
  Paper, Grid, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom';
import './tender.css';
import axios from 'axios';

export default function TenderScreen() {
  const [tableOrders, setTableOrders] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const { tableId } = useParams();
  const history = useHistory();

  useEffect(async () => {
    document.title = 'Tender';
    const { data } = await axios.get(`/api/tables/${tableId}/orders`);
    setTableOrders(data);

    const items = tableOrders.flatMap((order) => (
      order.map((item) => ({
        name: item.name,
        price: item.price
      }))
    ));

    setTableItems(items)

  });

  const Item = styled(Paper)({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
    height: 90,
    width: 90
  });



  return (
    <div className="orderDiv">
      <Box>
        <TableContainer component={Paper} className="orderPaper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Item</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            {tableItems.map(tableItem => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{tableItem.name}</TableCell>
                <TableCell>{tableItem.price}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
        <Box>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={null}
          >
            Card
          </Button>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={null}
          >
            Cash
          </Button>
          <Button
            variant="contained"
            size="large"
            color="error"
            component={RouterLink}
            to="/tables"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
}
