import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Box } from '@mui/material';
import office from '../images/office3.jpg';

export default function Property(props) {
  return (
    <Card sx={{ display: 'flex', flexGrow: 1}}>
      <CardActionArea href={props.to}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={office}
              alt={props.title}
            />
          </Box>
          <Box flexShrink>
            <CardContent flexShrink>
              <Typography gutterBottom variant="h6" component="h6">
                {props.title}
              </Typography>
              <Typography variant="p" component="p">
                {props.description}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}