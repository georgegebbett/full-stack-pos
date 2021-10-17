import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom';
import './tender.css';
import axios from 'axios';
import TenderAmountDialog from './tender-amount-dialog';
import ChangeDialog from './change-dialog';
import OrderItemTable from '../../../components/orderItemTable';

export default function TenderScreen() {
  const [tableOrders, setTableOrders] = useState([]);
  const [tableTenders, setTableTenders] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [tableTotal, setTableTotal] = useState([]);
  const [tenderDialogOpen, setTenderDialogOpen] = useState(false);
  const [changeDialogOpen, setChangeDialogOpen] = useState(false);
  const [changeAmount, setChangeAmount] = useState(0);
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

  const handleTenderAmountDialogCloseWithChange = (changeAmountArg) => {
    console.log('New item dialog close called');
    setTenderDialogOpen(false);
    setChangeAmount(changeAmountArg);
    setChangeDialogOpen(true);
    setUpdateData(!updateData);
  };

  const handleChangeDialogClose = () => {
    setChangeDialogOpen(false);
    history.push('/tables');
  };

  return (
    <div className="orderDiv">
      <Box>
        <TenderAmountDialog
          dialogOpen={tenderDialogOpen}
          handleClose={handleTenderAmountDialogClose}
          handleCloseWithChange={amount => handleTenderAmountDialogCloseWithChange(amount)}
          remainingValue={tableTotal}
          tenderType={tenderType}
        />
        <ChangeDialog
          dialogOpen={changeDialogOpen}
          handleClose={handleChangeDialogClose}
          changeAmount={changeAmount}
        />
        <OrderItemTable
          tableItems={tableItems}
          tableTenders={tableTenders}
          tableTotal={tableTotal}
        />
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
