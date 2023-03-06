import { Link, useOutletContext } from 'react-router-dom';

export function GameHome() {
  const { game } = useOutletContext();

  return (
    <div id='GameHome'>
      <h1>{game}</h1>
      
      <nav> { /* TODO: Pagination */ }
        <ul>
          <li><Link to='play'>Play</Link></li>
          { /* TODO: Config */ }
          { /* TODO: Rules */ }
          { /* TODO: About */ }
          <li><Link to='/'>Back</Link></li>
        </ul>
      </nav>
    </div>
  );
}

/* 
 * TODO:
 *  - Get game info an display it
 */
