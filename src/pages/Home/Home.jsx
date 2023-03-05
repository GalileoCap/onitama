import { Outlet, Link } from 'react-router-dom';

function GamesList() {
  return (
    <nav className='GamesList'>
      <ul>
        <li>
          <Link to='onitama'>Onitama</Link>
        </li>
        <li>
          <Link to='tiictaactooee'>TiicTaacTooee</Link>
        </li>
      </ul>
    </nav>
  );
}

export function Home() {
  return (
    <div id='Home'>
      <h1>GaliGames</h1>
      
      <GamesList />
      <nav>
        <ul>
          <li>
            <Link to='about'>About</Link>
          </li>
          <li>
            <Link to='config'>Config</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/*
 * TODO:
 *  - Welcome page
 *  - Dynamic list of available games
 */
