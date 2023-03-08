import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home'
import Apartment from "./Apartment";
import Medical from "./Medical";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/apartment" element={<Apartment />} />
          <Route exact path="/medical" element={<Medical />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;