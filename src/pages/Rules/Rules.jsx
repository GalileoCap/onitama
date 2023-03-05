import { useParams } from 'react-router-dom';

export function Rules() {
  const { game } = useParams();

  return (
    <div id='Rules'>
      <h1>Rules of {game}</h1>
    </div>
  );
}

/* 
 * TODO:
 *  - Get game info an display it
 */
