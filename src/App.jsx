import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ClickSpark from "./ui/ClickSpark";

function App() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={400}
    >
      {/* Your content here */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </ClickSpark>
  );
}

export default App;
