import { useOutletContext } from 'react-router-dom';

export function GameAbout() {
  const { game } = useOutletContext();

  return (
    <div id='GameAbout'>
      <h1>GameAbout {game}</h1>
    </div>
  );
}

/* 
 * TODO:
 *  - Get game info an display it
 */
