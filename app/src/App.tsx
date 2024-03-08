import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SetSelection from "./components/SetSelection/SetSelection";
import Dashboard from "./components/Dashboard/Dashboard";
import Quiz from "./components/Quiz/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card-sets" element={<SetSelection />} />
        <Route path="/:cardsetid" element={<Dashboard />} />
        <Route path="/:cardsetid/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
