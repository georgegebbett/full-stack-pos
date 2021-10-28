import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  FormControl, MenuItem, Select, Tab, Tabs, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';


function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function EditLayoutCellDialog(props) {
  const [layoutName, setLayoutName] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [layoutPrice, setLayoutPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const {
    handleClose, handleCancel, dialogOpen, items, layouts
  } = props;

  return (
    <Dialog open={dialogOpen} onClose={handleCancel}>
      {(loading
        ? <CircularProgress /> : (
          <React.Fragment>
            <DialogTitle>Edit layout</DialogTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Item" />
                <Tab label="Layout" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DialogContent>
                <FormControl required fullWidth>
                  <Select>
                    {items.map(item => (
                      <MenuItem key={item._id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <DialogContent>
                <FormControl required fullWidth>
                  <Select>
                    {layouts.map(layout => (
                      <MenuItem key={layout._id}>{layout.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
            </TabPanel>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleCancel}>Update Cell</Button>
            </DialogActions>
          </React.Fragment>
        ))}
    </Dialog>
  );
}

EditLayoutCellDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  layouts: PropTypes.array.isRequired
};

export default EditLayoutCellDialog;
