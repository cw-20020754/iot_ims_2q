import * as React from 'react';
import { Tab, Box, Card } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const CTabs = (props) => {
  const { tabDataList, sx, orientation, children } = props;

  const [value, setValue] = React.useState(
    tabDataList ? tabDataList[0].value : 0,
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <Box
          sx={
            orientation === 'vertical'
              ? {
                  flexGrow: 1,
                  display: 'flex',
                }
              : { borderBottom: 1, borderColor: 'divider' }
          }
        >
          <TabList
            onChange={handleChange}
            orientation={orientation}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {tabDataList &&
              tabDataList.map((tab, index) => (
                <Tab
                  key={index}
                  value={tab.value}
                  label={tab.label || tab.text}
                />
              ))}
          </TabList>

          {tabDataList &&
            tabDataList.map((tab, index) => (
              <TabPanel key={index} value={tab.value}>
                {children[index]}
              </TabPanel>
            ))}
        </Box>
      </TabContext>
    </Card>
  );
};

export default CTabs;
