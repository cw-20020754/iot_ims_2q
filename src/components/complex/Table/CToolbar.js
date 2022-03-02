import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getDatagridInfo } from '../../../redux/reducers/changeStateSlice';
import CButton from '../../basic/CButton';
import { isNull } from '../../../common/utils';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid-pro';

const CToolbar = (props) => {
  const { toolbarBtnList } = props;
  const dispatch = useDispatch();

  const itemHandler = (item) => {
    dispatch(getDatagridInfo(item));
  };

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={1}>
        {!isNull(toolbarBtnList) &&
          toolbarBtnList.map((item) => (
            <CButton
              key={item.text}
              variant="text"
              startIcon={item.startIcon}
              style={item.style}
              color={item.color}
              type={item.type}
              onClick={() => itemHandler(item)}
            >
              {item.text}
            </CButton>
          ))}
      </Stack>
    </GridToolbarContainer>
  );
};

export default CToolbar;
