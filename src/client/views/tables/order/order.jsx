import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom';
import './order.css';
import axios from 'axios';
import { round } from 'mathjs';

export default function OrderScreen() {
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    document.title = 'Order Entry';

    const getItems = async () => {
      const { data } = await axios.get('/api/items');
      setItems(data);
    };

    getItems();
  }, []);

  const Item = styled(Paper)({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
    height: 90,
    width: 90
  });

  const addItemToOrder = (orderItem) => {
    setOrderItems([
      ...orderItems,
      {
        name: orderItem.name,
        price: orderItem.price
      }
    ]);
    setOrderTotal(round(orderTotal + orderItem.price, 2));
  };

  const { tableId } = useParams();
  const history = useHistory();

  const submitOrder = () => {
    axios.post(`/api/tables/${tableId}/orders`, { orderItems, orderTotal })
      .then((order) => {
        console.log('Order submitted:', order);
        history.push('/tables');
      });
  };

  const submitOrderAndTender = () => {
    axios.post(`/api/tables/${tableId}/orders`, { orderItems, orderTotal })
      .then((order) => {
        console.log('Order submitted:', order);
        history.push(`/tables/${tableId}/tender`);
      });
  };

  return (
    <div className="orderDiv">
      <Box className="orderButtons">
        <Grid container justifyContent="center" spacing={5}>
          {items.map(item => (
            <Grid key={item._id} item xs={2} onClick={() => addItemToOrder(item)}>
              <Item>{item.name}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <TableContainer component={Paper} className="orderPaper">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">Item</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map(orderItem => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{orderItem.name}</TableCell>
                  <TableCell>
                    £
                    {orderItem.price / 100}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>
                  £
                  {orderTotal}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Box>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={submitOrder}
          >
            Send
          </Button>
          <Button
            variant="contained"
            size="large"
            color="warning"
            onClick={submitOrderAndTender}
          >
            Send & Tender
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
