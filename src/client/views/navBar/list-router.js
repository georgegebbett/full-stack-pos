import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link as RouterLink, Route, MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../controllers/use-auth';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    // eslint-disable-next-line max-len
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function ListRouter() {
  const auth = useAuth();
  return (
    <Box
      sx={{ width: 360 }}
    >
      <Paper elevation={0}>
        <List aria-label="main functions">
          <ListItemLink to="/home" primary="Home" icon={<HomeIcon />} />
          {auth.user.roles.includes('server') ? <ListItemLink to="/tables" primary="Tables" icon={<RestaurantIcon />} /> : null}
        </List>
        <Divider />
        <List aria-label="secondary functions">
          {auth.user.roles.includes('admin') ? <ListItemLink to="/users" primary="Users" icon={<GroupIcon />} /> : null}
          {auth.user.roles.includes('admin') ? <ListItemLink to="/items" primary="Items" icon={<FoodBankIcon />} /> : null}
        </List>
      </Paper>
    </Box>
  );
}
