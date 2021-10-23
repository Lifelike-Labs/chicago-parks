import { Card, CardActionArea, CardContent, Typography } from '@mui/material'

type Props = {
  item: any | null // Same issue - Want "Feature"
  selectItem: Function
}

export default function MapDrawerCard({ item, selectItem }: Props) {
  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: 1,
        padding: 0,
        backgroundColor: 'grey.100',
        backgroundImage: item?.properties?.image ? `url(${item.properties.image})` : '',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
      }}
    >
      <CardActionArea onClick={() => selectItem(item)}>
        <CardContent
          sx={{ padding: 2, background: 'linear-gradient(to right, #f5f5f5FF, #f5f5f544)' }}
        >
          <Typography variant="h6" color="textSecondary">
            {item?.properties?.title || 'Untitled'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
