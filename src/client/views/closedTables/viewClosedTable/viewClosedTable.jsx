import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import './viewClosedTable.css';
import axios from 'axios';
import OrderItemTable from '../../../components/orderItemTable';

export default function ViewClosedTable() {
  const [tableTenders, setTableTenders] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [tableTotal, setTableTotal] = useState([]);
  const { tableId } = useParams();

  useEffect(() => {
    const getTableData = async () => {
      console.log('data fetched');
      document.title = 'Closed Table';
      axios.get(`/api/tables/${tableId}/orders`)
        .then((res) => {
          console.log('Table orders', res.data);
          const items = res.data.flatMap(order => (
            order.map(item => ({
              name: item.name,
              price: item.price
            }))
          ));
          setTableItems(items);
          axios.get(`/api/tables/${tableId}/tender`)
            .then((res1) => {
              setTableTenders(res1.data);
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
  }, []);

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
