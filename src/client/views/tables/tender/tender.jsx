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
import './tender.css';
import axios from 'axios';
import TenderAmountDialog from './tender-amount-dialog';

export default function TenderScreen() {
  const [tableOrders, setTableOrders] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [tableTotal, setTableTotal] = useState([]);
  const [tenderDialogOpen, setTenderDialogOpen] = useState(false);
  const [tenderType, setTenderType] = useState('');
  const [updateData, setUpdateData] = useState(false);
  const { tableId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getTableData = async () => {
      console.log('data fetched');
      document.title = 'Tender';
      axios.get(`/api/tables/${tableId}/orders`)
        .then((res) => {
          setTableOrders(res.data);
          console.log('Table orders', res.data);
          const items = res.data.flatMap(order => (
            order.map(item => ({
              name: item.name,
              price: item.price
            }))
          ));
          setTableItems(items);
        });
      axios.get(`/api/tables/${tableId}`)
        .then((res) => {
          setTableTotal(res.data.totalPrice);
        });
    };

    getTableData();
  }, [updateData]);

  const handleTenderAmountDialogOpen = (tenderButtonCaption) => {
    setTenderType(tenderButtonCaption);
    setTenderDialogOpen(true);
  };

  const handleTenderAmountDialogClose = () => {
    console.log('New item dialog close called');
    setTenderDialogOpen(false);
    setUpdateData(!updateData);
  };

  return (
    <div className="orderDiv">
      <Box>
        <TenderAmountDialog
          dialogOpen={tenderDialogOpen}
          handleClose={handleTenderAmountDialogClose}
          tenderType={tenderType}
        />
        <TableContainer component={Paper} className="orderPaper">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">Item</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableItems.map(tableItem => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{tableItem.name}</TableCell>
                  <TableCell>£{tableItem.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>£{tableTotal}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Box>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => handleTenderAmountDialogOpen('CARD')}
          >
            Card
          </Button>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => handleTenderAmountDialogOpen('CASH')}
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
