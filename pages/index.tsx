import { Box } from '@mui/system'
import { Feature } from 'geojson'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import Map from '../components/Map'
import MapDrawer from '../components/MapDrawer'

const drawerWidth = 300

const Home: NextPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null)
  const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection | null>(null)

  useEffect(
    () => {
      getGeojson()
    },
    // eslint-disable-next-line
    [],
  )

  const getGeojson = async () => {
    const res = await fetch('/api/geojson')
    const json = await res.json()
    setGeojson(json)
  }

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
            selectItem={selectItem}
            geojson={geojson}
          />
        </Box>
        <Box flexGrow={1} sx={{ height: '100vh', width: '100vw' }}>
          <Map geojson={geojson} selectItem={selectItem} selectedItem={selectedItem} />
        </Box>
      </Box>
    </>
  )
}

export default Home
