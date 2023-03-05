import { useParams } from 'react-router-dom';

export function Config() {
  const { game } = useParams();

  return (
    <div id='Config'>
      <h1>Config {game}</h1>
    </div>
  );
}

/* 
 * TODO:
 *  - General config
 *    - Name
 *    - Colorscheme
 *  - Game-specific config
 */
