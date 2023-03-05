import { useParams, Link } from 'react-router-dom';

export function GameHome() {
  const { game } = useParams();

  return (
    <div id='GameHome'>
      <h1>{game}</h1>
      
      <li>
        <Link to='play'>Play</Link>
      </li>
    </div>
  );
}

/* 
 * TODO:
 *  - Get game info an display it
 */
