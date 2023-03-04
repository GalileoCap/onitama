import { Outlet, Link } from "react-router-dom";

function GamesList() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="onitama/play">Onitama</Link>
        </li>
        <li>
          <Link to="tiictaactooee/play">TiicTaacTooee</Link>
        </li>
      </ul>
    </nav>
  );
}

export function Home() {
  return (
    <div className="Home">
      <h1>Home</h1>
      
      <GamesList />
    </div>
  );
}
