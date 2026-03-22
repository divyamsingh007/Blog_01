import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import AllBlogs from "./pages/AllBlogs";
import About from "./pages/About";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import ClickSpark from "./ui/ClickSpark";

// Admin Views
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/views/Dashboard";
import PostsList from "./admin/views/PostsList";
import PostEditor from "./admin/views/PostEditor";
import Settings from "./admin/views/Settings";

function App() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={400}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Protected Nested Layout */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="editor" element={<PostEditor />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ClickSpark>
  );
}

export default App;
