import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Outlet />

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
      <button onClick={() => Notification.requestPermission()}>Allow notifications</button>
    </>
  );
}
