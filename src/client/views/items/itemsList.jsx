import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, ListItem, ListItemText
} from '@mui/material';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get('/api/items');
    setItems(data);
    const tempCats = (await axios.get('/api/items/categories')).data;
    setCategories(tempCats);
  });

  return (
    <Box>
      <ButtonGroup>
        {categories.map(category => (
          <Button>{category.name}</Button>
        ))}
      </ButtonGroup>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {categories.map(category => (
          <li key={`section-${category.name}`}>
            <ul>
              <ListSubheader>{category.name}</ListSubheader>
              {items.map(item => (item.category === category.name ? (
                <ListItem key={`item-${category.category}-${item.name}`}>
                  <ListItemText primary={item.name} secondary={item.price} />
                </ListItem>
              ) : null
              ))}
            </ul>
          </li>
        ))}
      </List>
      <Fab>
        <AddIcon />
      </Fab>
    </Box>
  );
}
