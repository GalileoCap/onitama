import { Link } from 'react-router-dom';

function GamesList() {
  return (
    <nav className='GamesList'>
      <ul>
        <li><Link to='onitama'>Onitama</Link></li>
        <li><Link to='tiictaactooee'>TiicTaacTooee</Link></li>
      </ul>
    </nav>
  );
}

export function Home() {
  return (
    <div id='Home'>
      <GamesList />
    </div>
  );
}

/*
 * TODO:
 *  - Welcome page
 *  - Dynamic list of available games
 */
