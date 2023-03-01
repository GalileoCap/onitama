import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home, Play, About } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onitama" element={<Layout />}>
           <Route index element={<Home />} />
           <Route path="play" element={<Play />} />
          { /* TODO: Join */}
           <Route path="about" element={<About />} />
          { /* TODO: NoPage */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
