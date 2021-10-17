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
import OrderItemTable from '../../../components/orderItemTable';

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
        <OrderItemTable
          tableTotal={tableTotal}
          tableItems={tableItems}
          tableTenders={tableTenders}
        />
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
