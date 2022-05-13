import React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/styles';
import { History } from '@mui/icons-material';

const CGridActionsCellItem = (props) => {
  const { onClick, type, id, hideable } = props;

  const theme = useTheme();

  const iconType = (type) => {
    if (type === 'delete') {
      return <DeleteIcon sx={{ color: theme.palette.grey.main }} />;
    } else if (type === 'edit') {
      return <EditIcon sx={{ color: theme.palette.primary.main }} />;
    } else if (type === 'history') {
      return <History sx={{ color: theme.palette.primary.main }} />;
    }
  };

  return (
    <>
      {!hideable && (
        <GridActionsCellItem
          icon={type && iconType(type)}
          label={type}
          onClick={() => onClick(type, id)}
        />
      )}
    </>
  );
};

export default CGridActionsCellItem;
