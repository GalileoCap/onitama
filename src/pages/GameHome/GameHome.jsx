import { Link, useOutletContext } from 'react-router-dom';

export function GameHome() {
  const { game } = useOutletContext();

  return (
    <div id='GameHome'>
      <h1>{game}</h1>
      
      <li>
        <Link to='play'>Play</Link>
      </li>
      <li>
        <Link to='about'>Rules & About</Link>
      </li>
      <li>
        <Link to='config'>Config</Link>
      </li>
      <li>
        <Link to='/'>Back</Link>
      </li>
    </div>
  );
}

/* 
 * TODO:
 *  - Get game info an display it
 */
