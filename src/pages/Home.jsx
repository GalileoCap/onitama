import { Outlet, Link } from "react-router-dom";

export function Home() {
  return (
    <div className="Home">
      <h1>Onitama</h1>
      
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="play">Play</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
