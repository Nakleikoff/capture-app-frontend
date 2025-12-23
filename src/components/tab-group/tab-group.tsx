import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

type TabItem = {
  title: string;
  panelChildren: React.ReactNode;
};

interface TabGroupProps {
  items: TabItem[];
}
export default function TabGroup({ items }: TabGroupProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            '& .MuiTab-root:focus': {
              outline: 'none',
              boxShadow: 'none',
              border: 'none',
            },
          }}
        >
          {items.map((tabItem, index) => (
            <Tab
              key={`tab-${index}`}
              label={tabItem.title}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {items.map((tab, index) => {
        return (
          <CustomTabPanel key={`panel-${index}`} value={value} index={index}>
            {tab.panelChildren}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
