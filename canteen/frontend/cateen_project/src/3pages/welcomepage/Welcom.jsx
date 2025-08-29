import { ArrowRight, Package, Shield, Store, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Welcom = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
      {/* Title Section with Logo */}
      <header className="text-center py-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-emerald-600 text-white p-3 rounded-full shadow-lg text-2xl">
            🍽️
          </div>
          <h1 className="text-5xl font-extrabold text-emerald-800 drop-shadow-sm">
            Online Canteen
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-emerald-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Package className="w-10 h-10 text-emerald-700" />
          </div>
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">
            Welcome to Online Canteen
          </h2>
          <p className="text-lg text-emerald-700/80 max-w-2xl mx-auto leading-relaxed">
            A simple, modern way to order food, track your orders, and manage
            canteen operations with ease.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* User Card */}
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-8">
            <div className="text-center pb-6">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-semibold text-emerald-800">
                For Users
              </h3>
              <p className="text-emerald-700/80 mt-2">
                Browse, order, and track food directly from your phone.
              </p>
            </div>

            <div className="space-y-4 text-emerald-800">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Place orders easily with your smartphone</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <span>Track your food order in real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-emerald-600" />
                  <span>Skip queues by ordering in advance</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Link to="/user/signup" className="block">
                  <button className="w-full px-5 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition">
                    Sign Up as User
                  </button>
                </Link>
                <Link to="/user/login" className="block">
                  <button className="w-full px-5 py-3 border border-emerald-300 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition">
                    Already have an account?
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white rounded-2xl border border-green-200 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-8">
            <div className="text-center pb-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-2xl font-semibold text-green-800">
                Admin Portal
              </h3>
              <p className="text-green-700/80 mt-2">
                Manage menu items, pricing, and view user stats.
              </p>
            </div>

            <div className="space-y-4 text-green-800">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-green-600" />
                  <span>Manage menus, prices, and stock</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <span>View registered users</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Access admin controls & settings</span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/admin/login" className="block">
                  <button className="w-full px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold hover:opacity-90 transition">
                    Admin Access
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcom;





