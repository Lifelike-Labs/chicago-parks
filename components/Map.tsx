import { useEffect, useState } from 'react'
import ReactMapGL, { Layer, Source } from 'react-map-gl'

export default function Map() {
  const [viewport, setViewport] = useState({})
  const [geojson, setGeojson] = useState(null)

  useEffect(
    () => {
      getGeojson()
    },
    // eslint-disable-next-line
    [],
  )

  const getGeojson = async () => {
    const res = await fetch('/chicago-parks.geojson')
    const json = await res.json()
    setGeojson(json)
  }

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
    >
      {geojson && (
        <Source id="park-data" type="geojson" data={geojson}>
          <Layer type="circle" paint={{ 'circle-radius': 10, 'circle-color': '#ff0000' }} />
        </Source>
      )}
    </ReactMapGL>
  )
}
