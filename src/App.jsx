import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, GameHome, Play, Join } from './pages';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"> { /* TODO: Layout */ }
          <Route index element={<Home />} />
          <Route path=":game" element={<GameHome />} />
          <Route path=":game/play" element={<Play />} />
          <Route path=":game/join/:peerId" element={<Join />} />
          { /* TODO: GameAbout */}
          { /* TODO: About */}
          { /* TODO: NoPage */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
