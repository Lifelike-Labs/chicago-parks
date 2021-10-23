import { Feature } from 'geojson'
import * as React from 'react'
import { Marker } from 'react-map-gl'

const ICON: string = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const SIZE: number = 20

type Props = {
  item: any // Same typing issue - Want "Feature"
  isSelected: boolean
  onClick: (item: Feature) => void
}

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function MapItem(props: Props) {
  const { item, isSelected, onClick } = props
  return (
    <Marker longitude={item.geometry.coordinates[0]} latitude={item.geometry.coordinates[1]}>
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          fill: isSelected ? 'gold' : 'lightblue',
          stroke: 'black',
          strokeWidth: 1,
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
        }}
        onClick={() => onClick(item)}
      >
        <path d={ICON} />
      </svg>
    </Marker>
  )
}

export default React.memo(MapItem)
