import React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CGridActionsCellItem = (type, params) => {
  return (
    <GridActionsCellItem
      icon={type && type === 'delete' ? <DeleteIcon /> : <EditIcon />}
      label={type}
      onClick={() => params.id(console.log(params.id))}
    />
  );
};

export default CGridActionsCellItem;
