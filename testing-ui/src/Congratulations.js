import { useState } from 'react';
import { ReactImageTint } from 'react-image-tint';
import './Main.css';

function Congratulations()
{
  const pals = [
    { id: 1, name: 'Purple', image: require('./images/rest.png'), color: '#d179e8' },
    { id: 2, name: 'Green', image: require('./images/rest-green.png'), color: '#85BAA1' },
    { id: 3, name: 'Orange', image: require('./images/rest-orange.png'), color: '#F39C6B' },
    { id: 4, name: 'Blue', image: require('./images/rest-blue.png'), color: '#64BBEB' },
   ]

  // based on whatever the user selected during PickPal --> pass in id or name
  const pal = pals.find(obj => {
    return obj.id === 1;
  });

  function ClickNext()
  {
    alert('You have selected ' + pal.name);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Congratulations!
        </p>
      </header><br/>
      
      <img className="imageCongratulations" src={pal.image} alt='' />
      
      <h2> You've completed the setup. </h2>

      <button className='button' onClick={ClickNext}>Next</button>

    </div>
  );
}

export default Congratulations; 