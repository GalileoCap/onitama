/* 
 * INFO:
 *  Defines the routes and context for the website.
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom'; //TODO: Replace HashRouter when switching to games.galileocap.me

import { HomeWrapper } from './components/HomeWrapper';
import { GameWrapper } from './components/GameWrapper';
import {
  Home,
  GameHome,
  Play,
  Join,
} from './pages';

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeWrapper />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/:game' element={<GameWrapper />}>
          <Route index element={<GameHome />} />
          <Route path='play' element={<Play />} />
          <Route path='join/:peerId' element={<Join />} />
        </Route>
      </Routes>
    </Router>
  );
}
