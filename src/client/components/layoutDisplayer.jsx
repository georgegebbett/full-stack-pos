import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import axios from 'axios';

function LayoutDisplayer(props) {
  const {
    layout, blankOnClick, itemOnClick, layoutOnClick
  } = props;

  const Item = styled(Paper)({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
    height: 90,
    width: 90
  });

  const getItemName = async itemId => (await axios.get(`/api/items/${itemId}`)).data.name;

  return (
    <Box className="orderButtons">
      <Grid container justifyContent="center" spacing={5}>
        {layout.map((item) => {
          switch (item.type) {
            case 'blank':
              return (
                <Grid item xs={2} onClick={blankOnClick}>
                  <Item />
                </Grid>
              );
            case 'item':
              return (
                <Grid key={item.id} item xs={2} onClick={itemOnClick}>
                  <Item>{getItemName(item.id)}</Item>
                </Grid>
              );
            case 'layout':
              return (
                <Grid key={item.id} item xs={2} onClick={layoutOnClick}>
                  <Item>{item.id}</Item>
                </Grid>
              );
            default:
              return (
                <Grid item xs={2}>
                  <Item />
                </Grid>
              );
          }
        })}
      </Grid>
    </Box>
  );
}

LayoutDisplayer.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.object).isRequired,
  blankOnClick: PropTypes.func.isRequired,
  itemOnClick: PropTypes.func.isRequired,
  layoutOnClick: PropTypes.func.isRequired
};

export default LayoutDisplayer;
