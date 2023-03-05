/* 
 * INFO:
 *  Defines the routes and context for the website.
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom'; //TODO: Replace HashRouter when switching to games.galileocap.me
import { PeerProvider } from './peer';

import { Layout, Home, GameHome, Play, Join, GameAbout, Config, About } from './pages';

export default function Main() {
  return (
    <PeerProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route index element={<Home />} />

            <Route path=':game' element={<GameHome />} />
            <Route path=':game?/play' element={<Play />} />
            <Route path=':game/join/:peerId' element={<Join />} />
            <Route path=':game/about' element={<GameAbout />} />

            <Route path=':game?/config' element={<Config />} />
            <Route path='/about' element={<About />} />
            { /* TODO: <Route path='*' element={<NoMatch />} /> */ }
          </Route>
        </Routes>
      </Router>
    </PeerProvider>
  );
}
