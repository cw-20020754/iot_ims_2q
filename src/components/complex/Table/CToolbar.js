import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getDatagridToolbar } from '../../../redux/reducers/changeStateSlice';
import CButton from '../../basic/CButton';
import { isNull } from '../../../common/utils';

const CToolbar = (props) => {
  const { toolbarBtnList } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const itemHandler = (item) => {
    dispatch(getDatagridToolbar(item));
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
              text={item.text}
              style={item.style}
              type={item.type}
              onClick={() => itemHandler(item)}
            />
          ))}
      </Stack>
    </GridToolbarContainer>
  );
};

export default CToolbar;
