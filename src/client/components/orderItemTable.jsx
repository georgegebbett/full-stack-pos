import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { currencyFormatter } from '../controllers/currencyFormatter';

function OrderItemTable(props) {
  const { tableItems, tableTenders, tableTotal } = props;
  return (
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
          {(tableTenders
            ? (
              tableTenders.map(tableTender => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{tableTender.type}</TableCell>
                  <TableCell>
                    <b>
                      {currencyFormatter.format(tableTender.amount / 100)}
                    </b>
                  </TableCell>
                </TableRow>
              ))
            )
            : null)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>{(tableTotal > 0 ? 'Total' : 'Change')}</TableCell>
            <TableCell>
              {currencyFormatter.format(tableTotal / 100)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

OrderItemTable.propTypes = {
  tableItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableTenders: PropTypes.arrayOf(PropTypes.object),
  tableTotal: PropTypes.number.isRequired
};

OrderItemTable.defaultProps = {
  tableTenders: []
};

export default OrderItemTable;
