import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

function OrderButtons(props) {
  const { items, addItemToOrder } = props;

  const Item = styled(Paper)({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
    height: 90,
    width: 90
  });

  return (
    <Box className="orderButtons">
      <Grid container justifyContent="center" spacing={5}>
        {items.map(item => (
          <Grid key={item._id} item xs={2} onClick={() => addItemToOrder(item)}>
            <Item>{item.name}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

OrderButtons.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  addItemToOrder: PropTypes.func.isRequired
};

OrderButtons.defaultProps = {
  items: []
};

export default OrderButtons;
