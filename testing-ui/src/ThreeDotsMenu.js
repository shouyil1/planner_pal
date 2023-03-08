import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Main.css';

function ThreeDotsMenu()
{
  function ClickSettings()
  {
    alert('Go to Settings page');
  }

  function ClickLogout()
  {
    alert('Logout');
  }

  function ClickCancel()
  {
    alert('Exit the ThreeDotsMenu');
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Menu
        </p>
      </header><br/>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
        container
        direction="column"
        justifyContent="flex-start"
        rowSpacing={2}
        width={200}
      >
          <Grid item xs={12}>
            <button className='buttonFull' onClick={ClickSettings}>Settings</button>
          </Grid>

          <Grid item xs={12}>
            <button className='buttonFull' onClick={ClickLogout}>Logout</button>
          </Grid>

          <Grid item xs={12}>
            <button className='buttonFull' onClick={ClickCancel}>Cancel</button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ThreeDotsMenu; 