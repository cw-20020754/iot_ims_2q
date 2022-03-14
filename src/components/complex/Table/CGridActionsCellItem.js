import React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CGridActionsCellItem = (props) => {
  const { onClick, type, id } = props;

  return (
    <GridActionsCellItem
      icon={type && type === 'delete' ? <DeleteIcon /> : <EditIcon />}
      label={type}
      onClick={() => onClick(type, id)}
    />
  );
};

export default CGridActionsCellItem;
