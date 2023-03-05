import { useParams } from 'react-router-dom';

export function GameAbout() {
  const { game } = useParams();

  return (
    <div id='GameAbout'>
      <h1>About {game}</h1>
    </div>
  );
}

/* 
 * TODO:
 *  - Get game info an display it
 */
