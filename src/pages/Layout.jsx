import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/onitama/">Home</Link>
          </li>
          <li>
            <Link to="play">Play</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
