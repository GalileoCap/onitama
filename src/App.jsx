import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Play, Join } from './pages';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"> { /* TODO: Layout */ }
          <Route index element={<Home />} />
          <Route path=":game/play" element={<Play />} />
          <Route path="join/:peerId" element={<Join />} />
          { /* TODO: About */}
          { /* TODO: NoPage */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
