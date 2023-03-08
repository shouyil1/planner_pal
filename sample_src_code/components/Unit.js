import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box'
import office from '../images/office3.jpg';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link, useNavigate } from "react-router-dom";

const steps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

function DotsMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Paper square elevation={0}>
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <img src={steps[activeStep].imgPath} alt={steps[activeStep].label} />
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
}

export default function Unit(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((true));
  };

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent >
          <DotsMobileStepper />
          <DialogContentText>
            Price: {props.price} ({props.number} units currently available)
          </DialogContentText>
          <DialogContentText>
            SQFT: 2000
          </DialogContentText>
          <Button variant="text" size="small" href="tel:+19094888375">
            Call 909-488-8375
          </Button>
          <DialogContentText>
          <Button variant="text" size="small" href="mailto:danielpbohen@gmail.com">
            Email danielpbohen@gmail.com
          </Button>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
  else {
    return (
      <Card>
        <CardActionArea
          onClick={handleClick}
          sx={{ display: 'flex', flexGrow: 1, wordWrap: "break-word" }}
        >

          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={office}
            alt={props.title}
          />
          <Box sx={{ p: 1.5, wordWrap: 'break-word', maxWidth: "95%" }}>
            <Typography variant="h6" >{props.title}</Typography>
            <Typography variant="p" component="h5">Price: {props.price} ({props.number} units currently available)</Typography>
            <Typography sx={{ wordWrap: 'break-word', }}>
              {props.description}
            </Typography>
          </Box>


        </CardActionArea>
      </Card>
    );
  }

}