import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header with Logo */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="bg-emerald-600 text-white p-4 rounded-full shadow-lg mb-4 text-3xl">
            🍽️
          </div>
          <h1 className="text-3xl font-bold text-emerald-800">User Login</h1>
          <p className="mt-2 text-emerald-700/80">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-emerald-800">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 h-5 w-5 pointer-events-none" />
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-emerald-800">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 h-5 w-5 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full pl-10 pr-10 py-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-emerald-700">
          Don&apos;t have an account?{" "}
          <Link to="/user/signup" className="text-emerald-800 font-semibold hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

