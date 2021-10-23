import { Box } from '@mui/system'
import { Feature } from 'geojson'
import type { NextPage } from 'next'
import { useState } from 'react'
import Header from '../components/common/Header'
import Map from '../components/Map'
import MapDrawer from '../components/MapDrawer'

const drawerWidth = 300

const Home: NextPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null)

  const selectItem = (item: Feature | null) => {
    setDrawerOpen(true)
    setSelectedItem(item)
  }

  return (
    <>
      <Header setDrawerOpen={setDrawerOpen} />
      <Box display="flex">
        <Box flexShrink={0}>
          <MapDrawer
            drawerWidth={drawerWidth}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            selectedItem={selectedItem}
          />
        </Box>
        <Box flexGrow={1} sx={{ height: '100vh', width: '100vw' }}>
          <Map selectItem={selectItem} selectedItem={selectedItem} />
        </Box>
      </Box>
    </>
  )
}

export default Home
