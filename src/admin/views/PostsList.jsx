import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Edit2, Trash2, Filter, ChevronDown, Calendar, Eye, CheckCircle2 } from "lucide-react";

export default function PostsList() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(p => ({
          id: p._id,
          title: p.title,
          category: p.category,
          status: "Published", // Simplified
          date: new Date(p.createdAt || p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          views: "-"
        }));
        setPosts(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          setPosts(posts.filter(p => p.id !== id));
        } else if (res.status === 401) {
          alert("Session expired. Please re-login.");
        } else {
          alert("Failed to delete post.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting post.");
      }
    }
  };

  const tabs = ["All", "Published", "Drafts"];

  const filteredPosts = posts
    .filter(post => {
      if (activeTab === "Published" && post.status !== "Published") return false;
      if (activeTab === "Drafts" && post.status !== "Draft") return false;
      if (activeCategory !== "All" && post.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      const d1 = new Date(a.date).getTime();
      const d2 = new Date(b.date).getTime();
      return sortOrder === "Newest" ? d2 - d1 : d1 - d2;
    });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-['Bricolage_Grotesque']! text-4xl! font-black! tracking-[-0.03em]! text-[#2B1F39]! mb-2">
            All Posts
          </h1>
          <p className="font-['Roboto']! text-lg! text-[#2B1F39]/60!">
            Manage your published articles and drafts.
          </p>
        </div>
        <Link
          to="/admin/editor"
          className="inline-flex items-center justify-center gap-2 bg-[#2B1F39] text-[#DFEFE9] px-7 py-3.5 rounded-full font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Post
        </Link>
      </header>

      {/* Advanced Filters & Options */}
      <div className="bg-white/50 border border-[#2B1F39]/10 rounded-[2rem] overflow-hidden mb-6">
        
        {/* Top Filter Bar */}
        <div className="p-6 border-b border-[#2B1F39]/10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-xl font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-[#2B1F39] text-[#DFEFE9] shadow-sm" 
                    : "bg-transparent text-[#2B1F39]/60 hover:bg-[#2B1F39]/5 hover:text-[#2B1F39]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B1F39]/40" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
              />
            </div>

            {/* Sort & Filter Dropdowns */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select 
                  value={activeCategory}
                  onChange={(e) => { setActiveCategory(e.target.value); setCurrentPage(1); }}
                  className="appearance-none w-full flex items-center justify-between gap-2 px-4 py-2.5 pr-8 bg-white border border-[#2B1F39]/10 rounded-xl font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-[#2B1F39]/5 transition-colors shadow-sm focus:outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Essays">Essays</option>
                  <option value="Short Read">Short Read</option>
                  <option value="Thought Pieces">Thought Pieces</option>
                  <option value="Dev Log">Dev Log</option>
                  <option value="Travel">Travel</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#2B1F39]/50">
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortOrder}
                  onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
                  className="appearance-none w-full flex items-center justify-between gap-2 px-4 py-2.5 pr-8 bg-white border border-[#2B1F39]/10 rounded-xl font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-[#2B1F39]/5 transition-colors shadow-sm focus:outline-none cursor-pointer"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#2B1F39]/50">
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data List */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#2B1F39]/5 border-b border-[#2B1F39]/10">
                <th className="px-8 py-4 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/50!">Post Details</th>
                <th className="px-8 py-4 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/50!">Status</th>
                <th className="px-8 py-4 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/50!">Publish Date</th>
                <th className="px-8 py-4 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/50!">Metrics</th>
                <th className="px-8 py-4 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/50! text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.length > 0 ? paginatedPosts.map((post) => (
                <tr key={post.id} className="border-b border-[#2B1F39]/5 hover:bg-white/80 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-['Bricolage_Grotesque']! font-bold! text-lg! text-[#2B1F39]! tracking-tight! mb-1">
                      {post.title}
                    </p>
                    <p className="font-['Montserrat']! font-bold! text-[0.55rem]! uppercase! tracking-widest! text-[#2B1F39]/50!">
                      {post.category}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full font-['Montserrat']! font-bold! text-[0.6rem]! uppercase! tracking-widest! inline-flex items-center gap-1.5 ${
                      post.status === "Published" ? "bg-green-50 text-green-700 border border-green-200 shadow-sm" : "bg-[#2B1F39]/5 text-[#2B1F39]/60 border border-[#2B1F39]/10 shadow-sm"
                    }`}>
                      {post.status === "Published" ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-[#2B1F39]/40" />}
                      {post.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-['Roboto']! text-sm! text-[#2B1F39]/70!">
                     <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-[#2B1F39]/40" />
                       {post.date}
                     </div>
                  </td>
                  <td className="px-8 py-5 font-['Roboto']! text-sm! text-[#2B1F39]/70! font-bold!">
                     <div className="flex items-center gap-2">
                       <Eye size={14} className="text-[#2B1F39]/40" />
                       {post.views}
                     </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/editor?id=${post.id}`} className="p-2.5 text-[#2B1F39]/50 hover:text-[#2B1F39] hover:bg-white rounded-xl transition-colors border border-transparent hover:border-[#2B1F39]/10 shadow-sm">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center font-['Roboto']! text-sm! text-[#2B1F39]/50!">
                    No posts currently match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 bg-[#2B1F39]/5 border-t border-[#2B1F39]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
           <p className="font-['Roboto']! text-xs! text-[#2B1F39]/50! font-bold!">
             Showing <span className="text-[#2B1F39]!">{filteredPosts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredPosts.length)}</span> of <span className="text-[#2B1F39]!">{filteredPosts.length}</span> posts
           </p>
           <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg bg-white border border-[#2B1F39]/10 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-[#2B1F39]/5 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button 
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-lg bg-white border border-[#2B1F39]/10 font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-[#2B1F39]/5 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
