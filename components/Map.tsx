import { Feature } from 'geojson'
import { useEffect, useState } from 'react'
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl'
import MapItem from './MapItem'

const getBounds = (features: Array<Feature>) => {
  // Calculate corner values of bounds
  // Can't figure out how to handle typing here...
  const pointsLong: number[] = features.map((f: any) => f.geometry.coordinates[0])
  const pointsLat: number[] = features.map((f: any) => f.geometry.coordinates[1])
  const minLong: number = Math.min(...pointsLong)
  const maxLong: number = Math.max(...pointsLong)
  const minLat: number = Math.min(...pointsLat)
  const maxLat: number = Math.max(...pointsLat)
  // Use WebMercatorViewport to get center longitude/latitude and zoom
  const viewport = new WebMercatorViewport({ width: 800, height: 600 }).fitBounds(
    [
      [minLong, minLat],
      [maxLong, maxLat],
    ],
    {
      padding: 100,
    },
  )
  const { longitude, latitude, zoom } = viewport
  return { longitude, latitude, zoom }
}

type Props = {
  selectItem: (item: Feature | null) => void
  selectedItem: Feature | null
}

export default function Map({ selectItem, selectedItem }: Props) {
  const [viewport, setViewport] = useState({})
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
    const bounds = getBounds(json.features)
    setViewport({ ...viewport, ...bounds })
  }

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      onClick={() => selectItem(null)}
    >
      {geojson &&
        geojson.features.map((item: Feature, index: number) => (
          <MapItem
            key={index}
            item={item}
            isSelected={item === selectedItem}
            onClick={selectItem}
          />
        ))}
    </ReactMapGL>
  )
}
