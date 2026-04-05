import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(s => s.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to={token ? "/analyze" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">
            Resu<span className="text-blue-600">Match</span>
          </span>
        </Link>

        {/* Links */}
        {token ? (
          <div className="flex items-center gap-1">
            <Link to="/analyze"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${isActive("/analyze")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              Analyze
            </Link>
            <Link to="/history"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${isActive("/history")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              History
            </Link>
            <button onClick={handleLogout}
              className="ml-3 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              Log In
            </Link>
            <Link to="/signup"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign Up
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}