import * as d3 from 'd3-ease'
import { Feature } from 'geojson'
import { useEffect, useState } from 'react'
import ReactMapGL, { FlyToInterpolator, WebMercatorViewport } from 'react-map-gl'
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
  geojson: GeoJSON.FeatureCollection | null
  selectItem: (item: Feature | null) => void
  selectedItem: Feature | null
}

export default function Map({ geojson, selectItem, selectedItem }: Props) {
  const [viewport, setViewport] = useState({})

  useEffect(() => {
    if (geojson) {
      const bounds = getBounds(geojson.features)
      setViewport({ ...viewport, ...bounds })
    }
  }, [geojson])

  useEffect(() => {
    if (selectedItem) {
      const geometry: any = selectedItem.geometry
      setViewport({
        ...viewport,
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: d3.easeCubic,
      })
    }
  }, [selectItem])

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
