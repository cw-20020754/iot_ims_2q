import * as React from 'react';
import { Tab, Box, Card } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const CTabs = (props) => {
  const { tabDataList, sx, orientation, children, onChange } = props;

  const [value, setValue] = React.useState(
    tabDataList ? tabDataList[0].value : 0,
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    return onChange(newValue, event.target.textContent);
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
                  heigth: 224,
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
            sx={orientation === 'vertical' ? { flex: 2 } : null}
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
            tabDataList.map((tab, index) => {
              return (
                <TabPanel key={index} value={tab.value} sx={sx}>
                  {children[index]}
                </TabPanel>
              );
            })}
        </Box>
      </TabContext>
    </Card>
  );
};

export default CTabs;
