import * as React from 'react';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutDisplayer from '../../components/layoutDisplayer';
import EditLayoutCellDialog from './layoutCellEditDialog';

export default function LayoutEditPage() {
  const { layoutId } = useParams();
  const [layout, setLayout] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    const getLayoutFromServer = async () => {
      const { data } = await axios.get(`/api/layouts/${layoutId}`);
      setLayout(data.items);
    };

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

    getLayoutFromServer();
  }, [layoutId]);

  const emptyFunc = () => null;

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleOpenEditDialog = () => {
    setDialogOpen(true);
  };

  console.log('layout', layout);

  return (
    <React.Fragment>
      <EditLayoutCellDialog
        handleCancel={handleCancel}
        dialogOpen={dialogOpen}
        handleClose={handleCancel}
        items={items}
        layouts={layouts}
      />
      <LayoutDisplayer
        layoutOnClick={handleOpenEditDialog}
        blankOnClick={handleOpenEditDialog}
        itemOnClick={handleOpenEditDialog}
        layout={layout}
      />
    </React.Fragment>
  );
}
