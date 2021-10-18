import * as React from 'react';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutDisplayer from '../../components/layoutDisplayer';

export default function LayoutEditPage() {
  const { layoutId } = useParams();
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    const getLayoutFromServer = async () => {
      const { data } = await axios.get(`/api/layouts/${layoutId}`);
      setLayout(data.items);
    };

    getLayoutFromServer();
  }, [layoutId]);

  const emptyFunc = () => null;

  console.log('layout', layout);

  return (
    <LayoutDisplayer
      layoutOnClick={emptyFunc}
      blankOnClick={emptyFunc}
      itemOnClick={emptyFunc}
      layout={layout}
    />
  );
}
