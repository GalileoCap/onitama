import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home, Play, Join, About } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onitama" element={<Layout />}>
           <Route index element={<Home />} />
           <Route path="play" element={<Play />} />
           <Route path="join/:peerId" element={<Join />} />
           <Route path="about" element={<About />} />
          { /* TODO: NoPage */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
