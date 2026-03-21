import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Mock auth delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Simple mock validation that logs in regardless (for demoing purposes)
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin");

    } catch (err) {
      setError("Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DFEFE9] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Absolute Top-Left Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full border border-[#2B1F39]/10 bg-white/40 backdrop-blur-xl shadow-sm text-[#2B1F39]/70 hover:text-[#2B1F39] hover:bg-white/80 transition-all duration-300 font-['Montserrat']! text-[0.65rem]! uppercase! tracking-widest! font-bold!"
        >
          <div className="bg-[#2B1F39] text-[#DFEFE9] w-7 h-7 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          Back to Home
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white/60 backdrop-blur-2xl border border-[#2B1F39]/10 rounded-[2rem] p-10 shadow-2xl shadow-[#2B1F39]/5 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#2B1F39] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <Lock className="text-[#DFEFE9]" size={28} />
          </div>
          <h1 className="font-['Bricolage_Grotesque']! text-4xl! font-bold! text-[#2B1F39]! tracking-tight! mb-2">
            Welcome Back
          </h1>
          <p className="font-['Roboto']! text-[#2B1F39]/60!">
            Sign in to manage the archive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm font-['Roboto']! text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B1F39]/40">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="divyam@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-[#2B1F39]/15 rounded-xl font-['Roboto']! text-[#2B1F39] focus:outline-none focus:border-[#2B1F39]/40 focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-['Montserrat']! font-bold! text-[0.65rem]! uppercase! tracking-widest! text-[#2B1F39]/70!">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B1F39]/40">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-white/50 border border-[#2B1F39]/15 rounded-xl font-['Roboto']! text-[#2B1F39] focus:outline-none focus:border-[#2B1F39]/40 focus:bg-white transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2B1F39]/40 hover:text-[#2B1F39] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-8 bg-[#2B1F39] text-[#DFEFE9] rounded-xl font-['Montserrat']! font-bold! uppercase! tracking-widest! text-xs! hover:bg-[#2B1F39]/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#2B1F39]/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
