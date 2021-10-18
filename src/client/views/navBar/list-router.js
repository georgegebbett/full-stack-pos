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
import RestoreIcon from '@mui/icons-material/Restore';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Link as RouterLink } from 'react-router-dom';
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
  icon: PropTypes.element.isRequired,
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
          {auth.user.permissions.includes('order:read') ? <ListItemLink to="/tables" primary="Tables" icon={<RestaurantIcon />} /> : null}
          {auth.user.permissions.includes('closedTable:read') ? <ListItemLink to="/closedTables" primary="Closed Tables" icon={<RestoreIcon />} /> : null}
        </List>
        <Divider />
        <List aria-label="secondary functions">
          {auth.user.permissions.includes('user:read') ? <ListItemLink to="/users" primary="Users" icon={<GroupIcon />} /> : null}
          {auth.user.permissions.includes('item:read') ? <ListItemLink to="/items" primary="Items" icon={<FoodBankIcon />} /> : null}
          {auth.user.permissions.includes('layout:read') ? <ListItemLink to="/layouts" primary="Layouts" icon={<BackupTableIcon />} /> : null}
        </List>
      </Paper>
    </Box>
  );
}
