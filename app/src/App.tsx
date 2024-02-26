import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SetSelection from "./components/SetSelection/SetSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcard-sets" element={<SetSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
