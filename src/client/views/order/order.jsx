import React, { useEffect } from 'react';
import { Paper, Grid, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import './order.css';

export default function OrderScreen() {

  useEffect(() => {
    document.title = 'Order Entry';
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
      <Box className="orderButtons">
        <Grid container justifyContent="center" spacing={15}>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Item</Item>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TableContainer component={Paper} className="orderPaper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Item</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Box>
          <Button variant="contained" size="large" color="success">Send</Button>
          <Button variant="contained" size="large" color="error">Cancel</Button>
        </Box>
      </Box>
    </div>
  );
}
