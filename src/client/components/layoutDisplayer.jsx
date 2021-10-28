import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import axios from 'axios';

function LayoutDisplayer(props) {
  const {
    layout, blankOnClick, itemOnClick, layoutOnClick
  } = props;

  const [items, setItems] = useState([]);
  const [layouts, setLayouts] = useState([]);

  const Item = styled(Paper)({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
    height: 90,
    width: 90
  });


  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get('/api/items/');
      setItems(data);
    };
    const getLayouts = async () => {
      const { data } = await axios.get('/api/layouts/');
      setLayouts(data);
    };

    getItems();
    getLayouts();
  }, []);

  return (
    <Box className="orderButtons">
      <Grid container justifyContent="center" spacing={5}>
        {layout.items.map((item) => {
          switch (item.content.type) {
            case 'blank':
              return (
                <Grid item xs={2} onClick={() => {blankOnClick(item.key)}}>
                  <Item>Blank Square</Item>
                </Grid>
              );
            case 'item':
              return (
                <Grid key={item.key} item xs={2} onClick={() => {itemOnClick(item.key)}}>
                  <Item>{items.find(listItem => item.content.id === listItem._id).name}</Item>
                </Grid>
              );
            case 'layout':
              return (
                <Grid key={item.key} item xs={2} onClick={() => {layoutOnClick(item.key)}}>
                  <Item>{layouts.find(listLayout => item.content.id === listLayout._id).name}</Item>
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
  layout: PropTypes.object,
  blankOnClick: PropTypes.func.isRequired,
  itemOnClick: PropTypes.func.isRequired,
  layoutOnClick: PropTypes.func.isRequired
};

LayoutDisplayer.defaultProps = {
  layout: {items: []}
};

export default LayoutDisplayer;
