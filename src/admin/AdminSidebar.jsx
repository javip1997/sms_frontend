import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded text-sm font-medium ${
      isActive
        ? "bg-blue-900 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-blue-900">
        WeCare Admin
      </h2>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>

        <NavLink to="/admin/services" className={linkClass}>
          Services
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClass}>
          Bookings
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
