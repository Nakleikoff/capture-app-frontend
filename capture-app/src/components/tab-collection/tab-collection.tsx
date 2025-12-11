import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

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
  )
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  }
}

interface TabsCollectionProps {
  content: {
    title: string
    panelChildren: React.ReactNode
  }[]
}
export default function TabCollection({ content }: TabsCollectionProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          {content.map((tab, index) => (
            <Tab label={tab.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {content.map((tab, index) => {
        return (
          <CustomTabPanel value={value} index={index}>
            {tab.panelChildren}
          </CustomTabPanel>
        )
      })}
    </Box>
  )
}
