import { useState } from 'react';
import Grid from '@mui/material/Grid';
import './Main.css';

import Purple  from './images/rest.png';
import Green  from './images/rest-green.png';
import Orange  from './images/rest-orange.png';
import Blue  from './images/rest-blue.png';

function PickPal()
{
  const [pal, setPal] = useState('None');

  const ClickPal = event => 
  {
    setPal(event.target.id);
  }

  function ClickNext()
  {
    alert('You have selected ' + pal);
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Pick a Pal!
        </p>
      </header><br/>
 
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={0}>
          <img src={Purple} id='Petra' alt='' onClick={ClickPal} />
        </Grid>
        <Grid item xs={0}>
          <img src={Green} id='Gertrude' alt='' onClick={ClickPal} />
        </Grid>
        <Grid item xs={0}>
          <img src={Orange} id='Oliver' alt='' onClick={ClickPal} />
        </Grid>
        <Grid item xs={0}>
          <img src={Blue} id='Billy' alt='' onClick={ClickPal} />
        </Grid>
      </Grid>
      
      <h2> Currently Selected: {pal} </h2>

      <button className='button' onClick={ClickNext}>Pick Pal</button>

    </div>
  );
}

export default PickPal; 