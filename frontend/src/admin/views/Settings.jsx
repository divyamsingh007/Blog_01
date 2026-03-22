import { useState, useEffect } from "react";
import { User, Globe, Shield, Camera, Link as LinkIcon, CheckCircle2 } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profile, setProfile] = useState({
    firstName: "", lastName: "", email: "", role: "", bio: "",
    twitter: "", github: "", avatar: "",
    siteTitle: "", siteDescription: "", postsPerPage: 10, themePreference: "System"
  });
  
  const [passwords, setPasswords] = useState({
    currentPassword: "", newPassword: "", confirmPassword: ""
  });
  
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileUpdate = async () => {
    setStatusMsg({ type: "loading", text: "Saving changes..." });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => setStatusMsg({ type: "", text: "" }), 3000);
      } else {
        setStatusMsg({ type: "error", text: "Failed to update profile." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error occurred." });
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setStatusMsg({ type: "error", text: "New passwords do not match!" });
    }
    setStatusMsg({ type: "loading", text: "Updating password..." });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Password updated successfully!" });
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setStatusMsg({ type: "", text: "" }), 3000);
      } else {
        setStatusMsg({ type: "error", text: data.message || "Failed to update password." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error occurred." });
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "site", label: "Site Config", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-5xl">
      <header className="mb-12">
        <h1 className="font-['Bricolage_Grotesque']! text-4xl! md:text-5xl! font-black! tracking-[-0.03em]! text-[#2B1F39]! mb-2">
          Settings
        </h1>
        <p className="font-['Roboto']! text-lg! text-[#2B1F39]/60!">
          Manage your account and site preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-['Montserrat']! font-bold! text-[0.7rem]! uppercase! tracking-widest! transition-colors ${
                activeTab === item.id
                  ? "bg-[#2B1F39] text-[#DFEFE9] shadow-sm"
                  : "text-[#2B1F39]/60 hover:bg-white hover:text-[#2B1F39] border border-transparent hover:border-[#2B1F39]/10"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 min-h-[600px]">
          
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="bg-white/50 rounded-[2rem] p-8 lg:p-10 border border-[#2B1F39]/10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="font-['Bricolage_Grotesque']! text-2xl! font-bold! tracking-tight! text-[#2B1F39]! mb-6">
                  Profile Details
                </h2>
                
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-[#2B1F39]/10 rounded-full overflow-hidden flex-shrink-0 border border-[#2B1F39]/20 shadow-sm cursor-pointer hover:opacity-80 transition-opacity relative group">
                      <img src="/Divyam.jpeg" alt="Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#2B1F39]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={20} className="text-white" />
                      </div>
                    </div>
                    <div>
                       <p className="font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! text-[#2B1F39]! mb-1">Avatar</p>
                       <p className="font-['Roboto']! text-[#2B1F39]/50! text-sm! mb-3">JPG, GIF or PNG. 1MB max.</p>
                       <button className="px-5 py-2 rounded-full border border-[#2B1F39]/20 font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-white hover:border-[#2B1F39]/40 transition-colors shadow-sm">
                         Upload New
                       </button>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                     <div className="space-y-2">
                       <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">First Name</label>
                       <input
                         type="text"
                         value={profile.firstName}
                         onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                         className="w-full px-4 py-3.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Last Name</label>
                       <input
                         type="text"
                         value={profile.lastName}
                         onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                         className="w-full px-4 py-3.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                       />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        className="w-full px-4 py-3.5 bg-white/50 border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]/60! focus:outline-none transition-colors shadow-sm cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Role / Title</label>
                      <input
                        type="text"
                        value={profile.role}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
                        className="w-full px-4 py-3.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors resize-none shadow-sm"
                    />
                  </div>
                  
                  {/* Social Links Sub-section */}
                  <div className="pt-6 border-t border-[#2B1F39]/10">
                     <h3 className="font-['Bricolage_Grotesque']! font-bold! text-lg! text-[#2B1F39]! tracking-tight! mb-4">Social Links</h3>
                     
                     <div className="space-y-4">
                       <div className="flex items-center gap-3">
                         <div className="bg-white p-3 rounded-xl border border-[#2B1F39]/10 text-[#2B1F39]/60">
                            <LinkIcon size={16} />
                         </div>
                         <input
                           type="url"
                           placeholder="Twitter URL"
                           value={profile.twitter}
                           onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                           className="flex-1 px-4 py-3 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                         />
                       </div>
                       
                       <div className="flex items-center gap-3">
                         <div className="bg-white p-3 rounded-xl border border-[#2B1F39]/10 text-[#2B1F39]/60">
                            <LinkIcon size={16} />
                         </div>
                         <input
                           type="url"
                           placeholder="GitHub URL"
                           value={profile.github}
                           onChange={(e) => setProfile({...profile, github: e.target.value})}
                           className="flex-1 px-4 py-3 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                         />
                       </div>
                       
                       <div className="flex items-center gap-3">
                         <div className="bg-white p-3 rounded-xl border border-[#2B1F39]/10 text-[#2B1F39]/60">
                            <LinkIcon size={16} />
                         </div>
                         <input
                           type="url"
                           placeholder="LinkedIn URL"
                           className="flex-1 px-4 py-3 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                         />
                       </div>
                     </div>
                  </div>

                </div>
              </div>
              
              <div className="pt-8 border-t border-[#2B1F39]/10 flex items-center justify-between">
                <div>
                  {statusMsg.text && (
                    <span className={`text-sm font-['Roboto']! font-medium! flex items-center gap-2 ${statusMsg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                      {statusMsg.type === 'success' && <CheckCircle2 size={16} />}
                      {statusMsg.text}
                    </span>
                  )}
                </div>
                <button onClick={handleProfileUpdate} className="px-8 py-3.5 rounded-full bg-[#2B1F39] text-[#DFEFE9] font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors shadow-sm">
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {/* SITE CONFIG TAB */}
          {activeTab === "site" && (
            <div className="bg-white/50 rounded-[2rem] p-8 lg:p-10 border border-[#2B1F39]/10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="font-['Bricolage_Grotesque']! text-2xl! font-bold! tracking-tight! text-[#2B1F39]! mb-6">
                  Site Configuration
                </h2>
                
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Site Title</label>
                    <input
                      type="text"
                      value={profile.siteTitle}
                      onChange={(e) => setProfile({...profile, siteTitle: e.target.value})}
                      className="w-full px-4 py-3.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Meta Description (SEO)</label>
                    <textarea
                      value={profile.siteDescription}
                      onChange={(e) => setProfile({...profile, siteDescription: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3.5 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors resize-none shadow-sm"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-8 border-y border-[#2B1F39]/10 py-8">
                     <div className="flex-1 space-y-2">
                       <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Posts Per Page</label>
                       <p className="font-['Roboto']! text-xs! text-[#2B1F39]/50! mb-2">Configure how many articles display before pagination kicks in on /blogs.</p>
                       <input
                         type="number"
                         value={profile.postsPerPage}
                         onChange={(e) => setProfile({...profile, postsPerPage: e.target.value})}
                         min={1}
                         max={50}
                         className="w-24 px-4 py-3 bg-white border border-[#2B1F39]/10 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-[#2B1F39]/40 transition-colors shadow-sm"
                       />
                     </div>
                     
                     <div className="flex-1 space-y-2">
                       <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">Theme Preference</label>
                       <p className="font-['Roboto']! text-xs! text-[#2B1F39]/50! mb-2">Sets the default mode for first-time visitors.</p>
                       <div className="flex items-center gap-2">
                         <button 
                           onClick={() => setProfile({...profile, themePreference: 'System'})}
                           className={`flex items-center justify-center flex-1 py-3 rounded-xl font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! shadow-sm transition-colors ${profile.themePreference === 'System' ? 'bg-[#2B1F39] text-[#DFEFE9] border border-[#2B1F39]' : 'bg-white text-[#2B1F39]/60 border border-[#2B1F39]/10 hover:border-[#2B1F39]/30'}`}>
                           System
                         </button>
                         <button 
                           onClick={() => setProfile({...profile, themePreference: 'Light'})}
                           className={`flex items-center justify-center flex-1 py-3 rounded-xl font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! shadow-sm transition-colors ${profile.themePreference === 'Light' ? 'bg-[#2B1F39] text-[#DFEFE9] border border-[#2B1F39]' : 'bg-white text-[#2B1F39]/60 border border-[#2B1F39]/10 hover:border-[#2B1F39]/30'}`}>
                           Light
                         </button>
                         <button 
                           onClick={() => setProfile({...profile, themePreference: 'Dark'})}
                           className={`flex items-center justify-center flex-1 py-3 rounded-xl font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! shadow-sm transition-colors ${profile.themePreference === 'Dark' ? 'bg-[#2B1F39] text-[#DFEFE9] border border-[#2B1F39]' : 'bg-white text-[#2B1F39]/60 border border-[#2B1F39]/10 hover:border-[#2B1F39]/30'}`}>
                           Dark
                         </button>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-[#2B1F39]/10 flex items-center justify-between">
                <div>
                  {statusMsg.text && (
                    <span className={`text-sm font-['Roboto']! font-medium! flex items-center gap-2 ${statusMsg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                      {statusMsg.type === 'success' && <CheckCircle2 size={16} />}
                      {statusMsg.text}
                    </span>
                  )}
                </div>
                <button onClick={handleProfileUpdate} className="px-8 py-3.5 rounded-full bg-[#2B1F39] text-[#DFEFE9] font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! hover:bg-[#2B1F39]/90 transition-colors shadow-sm">
                  Update Configuration
                </button>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="bg-white/50 rounded-[2rem] p-8 lg:p-10 border border-[#2B1F39]/10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="font-['Bricolage_Grotesque']! text-2xl! font-bold! tracking-tight! text-[#2B1F39]! mb-6">
                  Security
                </h2>
                
                <div className="space-y-8">
                  <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 lg:p-8">
                     <h3 className="font-['Bricolage_Grotesque']! font-bold! text-lg! text-red-800! tracking-tight! mb-2">Update Password</h3>
                     <p className="font-['Roboto']! text-sm! text-red-900/60! mb-6">
                       Ensure your account is using a long, random password to stay secure.
                     </p>
                     
                     <div className="space-y-4">
                       <div className="space-y-2">
                         <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-red-900/70!">Current Password</label>
                         <input
                           type="password"
                           value={passwords.currentPassword}
                           onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                           className="w-full px-4 py-3 bg-white border border-red-200 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-red-400 transition-colors shadow-sm"
                         />
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-red-900/70!">New Password</label>
                           <input
                             type="password"
                             value={passwords.newPassword}
                             onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                             className="w-full px-4 py-3 bg-white border border-red-200 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-red-400 transition-colors shadow-sm"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-red-900/70!">Confirm New Password</label>
                           <input
                             type="password"
                             value={passwords.confirmPassword}
                             onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                             className="w-full px-4 py-3 bg-white border border-red-200 rounded-xl font-['Roboto']! text-sm! text-[#2B1F39]! focus:outline-none focus:border-red-400 transition-colors shadow-sm"
                           />
                         </div>
                       </div>
                     </div>
                     
                     <div className="mt-6 flex items-center justify-between">
                       <div>
                         {statusMsg.text && (
                           <span className={`text-sm font-['Roboto']! font-medium! flex items-center gap-2 ${statusMsg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                             {statusMsg.type === 'success' && <CheckCircle2 size={16} />}
                             {statusMsg.text}
                           </span>
                         )}
                       </div>
                       <button onClick={handlePasswordUpdate} className="px-6 py-2.5 rounded-full bg-red-600 text-white font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! hover:bg-red-700 transition-colors shadow-sm">
                         Update Password
                       </button>
                     </div>
                  </div>
                  
                  <div className="bg-[#2B1F39]/5 border border-[#2B1F39]/10 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                     <div>
                       <h3 className="font-['Bricolage_Grotesque']! font-bold! text-lg! text-[#2B1F39]! tracking-tight! mb-1">Two-Factor Authentication</h3>
                       <p className="font-['Roboto']! text-sm! text-[#2B1F39]/60!">
                         Add an extra layer of security to your admin portal.
                       </p>
                     </div>
                     <button className="whitespace-nowrap px-6 py-3 rounded-xl bg-white border border-[#2B1F39]/20 font-['Montserrat']! font-bold! text-xs! uppercase! tracking-widest! text-[#2B1F39] hover:bg-[#2B1F39]/5 transition-colors shadow-sm">
                       Enable 2FA
                     </button>
                  </div>
                  
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
