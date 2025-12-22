import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    { id: 1, title: "Sample Blog Post 1", status: "Published" },
    { id: 2, title: "Sample Blog Post 2", status: "Draft" },
  ]);

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <>
      <Background />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {posts.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Published</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {posts.filter((p) => p.status === "Published").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Drafts</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {posts.filter((p) => p.status === "Draft").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Manage Posts</h2>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
              Create New Post
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{post.id}</td>
                    <td className="py-3 px-4">{post.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          post.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:underline mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
