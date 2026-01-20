import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = isLoggedIn();

  // 🔥 HIDE HEADER ON ADMIN ROUTES
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-10 py-4 bg-white border-b">
      <Link to="/" className="text-2xl font-bold text-blue-900">
        WeCare
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact Us</Link>

        {!loggedIn ? (
          <Link
            to="/login"
            className="bg-blue-900 text-white px-5 py-2 rounded-md"
          >
            Login
          </Link>
        ) : (
          <>
            <Link to="/my-bookings">My Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
