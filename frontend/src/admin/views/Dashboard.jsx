import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Clock, FileText, TrendingUp, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  const [postCount, setPostCount] = useState("...");
  const [recentPosts, setRecentPosts] = useState([]);
  const [statsData, setStatsData] = useState({
    totalViews: 0,
    avgReadTime: "0m",
    engagement: "0%"
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then(res => res.json())
      .then(data => {
        setPostCount(data.length);
        setRecentPosts(data.slice(0, 3));
        
        let views = 0;
        let readTimeSum = 0;
        
        data.forEach(p => {
           views += (p.views || 0);
           const rtMatch = p.readTime ? p.readTime.match(/(\d+)/) : null;
           if (rtMatch) readTimeSum += parseInt(rtMatch[1]);
        });
        
        const avgRt = data.length ? (readTimeSum / data.length).toFixed(1) : 0;
        const totalViewsFormatted = views > 1000 ? (views / 1000).toFixed(1) + 'k' : views;
        // Simple synthetic engagement metric proxy based on views
        const eng = data.length ? Math.min(100, Math.max(12, (views / data.length) * 3)).toFixed(1) : 0;

        setStatsData({
          totalViews: totalViewsFormatted,
          avgReadTime: avgRt + 'm',
          engagement: eng + '%'
        });
      })
      .catch(console.error);
  }, []);

  const stats = [
    { label: "Total Views", value: statsData.totalViews, icon: Eye, trend: "+12%" },
    { label: "Published Posts", value: postCount, icon: FileText, trend: "+3" },
    { label: "Avg. Read Time", value: statsData.avgReadTime, icon: Clock, trend: "+0.5m" },
    { label: "Total Engagement", value: statsData.engagement, icon: TrendingUp, trend: "+2%" },
  ];

  return (
    <div>
      <header className="mb-12">
        <h1 className="font-['Bricolage_Grotesque']! text-4xl! sm:text-5xl! font-black! tracking-[-0.03em]! text-[#2B1F39]! mb-2">
          Dashboard
        </h1>
        <p className="font-['Roboto']! text-lg! text-[#2B1F39]/60!">
          Welcome back. Here's what's happening today.
        </p>
      </header>

      {/* Clean Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white/50 border border-[#2B1F39]/10 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-[#2B1F39]/50">
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1 bg-[#2B1F39]/10 px-2.5 py-1 rounded-lg text-[#2B1F39]! font-['Montserrat']! text-[0.65rem]! font-bold! tracking-widest!">
                <ArrowUpRight size={12} />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="font-['Bricolage_Grotesque']! text-3xl! font-bold! tracking-tight! text-[#2B1F39]!">
                {stat.value}
              </p>
              <p className="font-['Montserrat']! text-[0.65rem]! font-bold! uppercase! tracking-widest! text-[#2B1F39]/50! mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/50 border border-[#2B1F39]/10 rounded-2xl p-8">
          <h2 className="font-['Bricolage_Grotesque']! text-2xl! font-bold! tracking-tight! text-[#2B1F39]! mb-8">
            Recent Activity
          </h2>
          <div className="space-y-6">
            {recentPosts.length > 0 ? recentPosts.map((post) => (
               <div key={post._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-[#2B1F39]/5 last:border-0 last:pb-0">
                 <div>
                   <p className="font-['Roboto']! text-base! text-[#2B1F39]!">
                     <span className="font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#16a34a]! block sm:inline sm:mr-3">
                       Published
                     </span> 
                     {post.title}
                   </p>
                 </div>
                 <p className="font-['Roboto']! text-sm! text-[#2B1F39]/40!">
                   {new Date(post.createdAt || post.date).toLocaleDateString()}
                 </p>
               </div>
            )) : (
               <p className="text-[#2B1F39]/50 font-['Roboto']! text-sm!">No recent activity found.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#2B1F39] rounded-2xl p-8 text-[#DFEFE9]">
          <h2 className="font-['Bricolage_Grotesque']! text-2xl! font-bold! tracking-tight! text-[#DFEFE9]! mb-6">
            Quick Actions
          </h2>
          <div className="space-y-3">
             <Link to="/admin/editor" className="block w-full text-left bg-white/10 hover:bg-white/20 transition-colors px-5 py-4 rounded-xl font-['Montserrat']! text-xs! font-bold! uppercase! tracking-widest!">
               Write New Post
             </Link>
             <Link to="/admin/settings" className="block w-full text-left bg-white/10 hover:bg-white/20 transition-colors px-5 py-4 rounded-xl font-['Montserrat']! text-xs! font-bold! uppercase! tracking-widest!">
               Manage Settings
             </Link>
             <Link to="/admin/settings" className="block w-full text-left bg-white/10 hover:bg-white/20 transition-colors px-5 py-4 rounded-xl font-['Montserrat']! text-xs! font-bold! uppercase! tracking-widest!">
               Edit Profile
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
