import { Outlet } from 'react-router-dom';

export function HomeWrapper() {
  return (
    <div id='HomeWrapper'>
      <h1>GaliGames</h1>

      <Outlet />
    </div>
  );
}
