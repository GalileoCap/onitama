/* 
 * INFO:
 *  Defines the routes and context for the website.
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom'; //TODO: Replace HashRouter when switching to games.galileocap.me
import { PeerProvider } from './peer';

import { GameWrapper } from './components/GameWrapper';
import { Layout, Home, GameHome, Play, Join, GameAbout, Config, About } from './pages';

export default function Main() {
  return (
    <PeerProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route index element={<Home />} />
            { /* <Route path='play' element={<Play />} /> TODO: Game list */ }

            <Route path=':game' element={<GameWrapper />}>
              <Route index element={<GameHome />} />
              <Route path='play' element={<Play />} />
              { /* <Route path='config' element={<Config />} /> TODO: Game config*/ }
              <Route path='about' element={<GameAbout />} />
              <Route path='join/:peerId' element={<Join />} />
            </Route>

            <Route path='config' element={<Config />} />
            <Route path='about' element={<About />} />
          </Route>
        </Routes>
      </Router>
    </PeerProvider>
  );
}
