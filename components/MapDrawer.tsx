import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'

type Props = {
  drawerWidth: number
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  selectedItem: any | null // Same issue - Want "Feature"
}

export default function MapDrawer({ drawerWidth, drawerOpen, setDrawerOpen, selectedItem }: Props) {
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
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                {selectedItem?.properties?.title || 'Untitled'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {selectedItem?.properties?.description || ''}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {selectedItem.geometry.coordinates[1]}, {selectedItem.geometry.coordinates[0]}
              </Typography>
            </Box>
          )}
          {!selectedItem && (
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2, mx: 2 }}>
              Select a Chicago park on the map to see info about it!
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  )
}
