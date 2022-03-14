import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Stack } from '@mui/material';
import { isNull } from 'common/utils';
import { getDatagridInfo } from 'redux/reducers/changeStateSlice';

const CMatEdit = (props) => {
  const dispatch = useDispatch();
  const { editList } = props;

  const itemHandler = (item) => {
    dispatch(getDatagridInfo(item));
  };
  return (
    <Stack direction="row" spacing={1}>
      {!isNull(editList) &&
        editList.map((item) => (
          <IconButton
            aria-label="delete"
            size="small"
            key={item.type}
            onClick={() => itemHandler(item)}
          >
            {item.btnIcon}
          </IconButton>
        ))}
    </Stack>
  );
};

export default CMatEdit;
