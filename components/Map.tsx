import { useState } from 'react'
import ReactMapGL, { Layer, Source } from 'react-map-gl'

export default function Map() {
  const [viewport, setViewport] = useState({})

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
    >
      <Source id="park-data" type="geojson" data="/chicago-parks.geojson">
        <Layer type="circle" paint={{ 'circle-radius': 10, 'circle-color': '#ff0000' }} />
      </Source>
    </ReactMapGL>
  )
}
