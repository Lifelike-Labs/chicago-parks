import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import MapDrawerCard from './MapDrawerCard'

type Props = {
  drawerWidth: number
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  selectedItem: any | null // Same issue - Want "Feature"
  selectItem: Function
  geojson: GeoJSON.FeatureCollection | null
}

export default function MapDrawer({
  drawerWidth,
  drawerOpen,
  setDrawerOpen,
  selectedItem,
  selectItem,
  geojson,
}: Props) {
  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="persistent"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close-menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(false)}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          display="flex"
          justifyContent="center"
          padding={3}
        >
          {selectedItem && (
            <Box>
              <Button size="small" onClick={() => selectItem(null)}>
                Back to list
              </Button>
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                {selectedItem?.properties?.title || 'Untitled'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {selectedItem?.properties?.description || ''}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                {selectedItem.geometry.coordinates[1]}, {selectedItem.geometry.coordinates[0]}
              </Typography>
              {selectedItem?.properties?.image && (
                <Image
                  src={selectedItem?.properties?.image}
                  alt={selectedItem?.properties?.title || 'Untitled'}
                  width="300px"
                  height="250px"
                  objectFit="contain"
                  objectPosition="top"
                />
              )}
            </Box>
          )}
          {!selectedItem && geojson && (
            <Box width="100%">
              {geojson.features.map((item, index) => (
                <MapDrawerCard key={index} item={item} selectItem={selectItem} />
              ))}
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  )
}
