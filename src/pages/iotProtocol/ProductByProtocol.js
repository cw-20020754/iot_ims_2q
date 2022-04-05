import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CSearchCondition from 'components/complex/CSearchCondition';
import { useTranslation } from 'react-i18next';
// import { getProtocol } from 'api/iotProtocol/protocolAPI';

const ProductByProtocol = () => {
  const { t } = useTranslation();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      //test
      // getProtocol({ prodTypeCode: '01', typeCode: '0003' });
    }
  }, [initial]);

  const conditionList = [
    {
      id: 'prodType',
      category: 'prodType',
      label: t('word.prod') + ' ' + t('word.type'),
      type: 'selectBox',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'protocolType',
      category: 'protocolType',
      label: t('word.protocol') + ' ' + t('word.type'),
      type: 'selectBox',
      size: {
        xs: 3,
        lg: 3,
        md: 2,
      },
    },
    {
      id: 'devModelCode',
      category: 'devModelCode',
      label: t('word.devModelCode'),
      type: 'autoSelectBox',
      size: {
        xs: 6,
        lg: 6,
        md: 8,
      },
    },
  ];
  return (
    <Box>
      {/*<CSearchCondition*/}
      {/*  // onFetchData={onFetchData}*/}
      {/*  conditionList={conditionList}*/}
      {/*/>*/}
    </Box>
  );
};

export default ProductByProtocol;
