import { BrowserRouter, Route, Routes } from "react-router-dom";
import Skeleton from "./components/skeleton/skeleton";
import Country from "./pages/country/country";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Skeleton>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/country/:name" element={<Country />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Skeleton>
    </BrowserRouter>
  );
}

export default App;
