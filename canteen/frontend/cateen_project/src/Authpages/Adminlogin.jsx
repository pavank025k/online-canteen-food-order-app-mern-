import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const Adminlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { adminlogin, isAdminLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    adminlogin(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 flex items-center justify-center p-4">
      <div className="flex flex-col w-96 bg-white rounded-2xl border border-emerald-200 shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-emerald-600 text-white p-3 rounded-full shadow-lg text-2xl">
              🛡️
            </div>
            <h1 className="text-2xl font-bold text-emerald-800 drop-shadow-sm">
              Admin Login
            </h1>
          </div>
          <p className="text-emerald-700/80 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-emerald-800">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 h-5 w-5 pointer-events-none" />
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full pl-10 pr-10 py-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-emerald-800">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 h-5 w-5 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full pl-10 pr-10 py-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAdminLoggingIn}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center"
          >
            {isAdminLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Admin Sign in"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-emerald-700/80">
          Don't have an account?{" "}
          <Link
            to="/user/signup"
            className="text-emerald-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;

