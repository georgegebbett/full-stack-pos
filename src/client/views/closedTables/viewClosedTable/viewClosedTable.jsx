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
import './viewClosedTable.css';
import axios from 'axios';
import { abs } from 'mathjs';
import { currencyFormatter } from '../../../controllers/currencyFormatter';

export default function ViewClosedTable() {
  const [tableOrders, setTableOrders] = useState([]);
  const [tableTenders, setTableTenders] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [tableTotal, setTableTotal] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const { tableId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getTableData = async () => {
      console.log('data fetched');
      document.title = 'Closed Table';
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
          axios.get(`/api/tables/${tableId}/tender`)
            .then((res) => {
              setTableTenders(res.data)
            })
            .catch(() => {
              console.log('Error getting tenders');
            });
        });
      axios.get(`/api/tables/${tableId}`)
        .then((res) => {
          setTableTotal(res.data.totalPrice);
        });
    };

    getTableData();
  }, [updateData]);

  return (
    <div className="orderDiv">
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
              {tableItems.map(tableItem => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{tableItem.name}</TableCell>
                  <TableCell>
                    {currencyFormatter.format(tableItem.price / 100)}
                  </TableCell>
                </TableRow>
              ))}
              {tableTenders.map(tableTender => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{tableTender.type}</TableCell>
                  <TableCell>
                    <b>
                      {currencyFormatter.format(tableTender.amount / 100)}
                    </b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>{(tableTotal > 0 ? 'Total' : 'Change')}</TableCell>
                <TableCell>
                  {currencyFormatter.format(abs(tableTotal / 100))}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          size="large"
          color="error"
          component={RouterLink}
          to="/closedTables"
        >
          Back
        </Button>
      </Box>
    </div>
  );
}
