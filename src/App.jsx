import { Routes, Route } from "react-router-dom";

// USER PAGES
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

// ADMIN ROUTE GUARD & LAYOUT
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./admin/AdminLayout";

// ADMIN PAGES
import AdminDashboard from "./admin/pages/Dashboard";
import AdminCategories from "./admin/pages/Categories";
import AdminServices from "./admin/pages/Services";
import AdminBookings from "./admin/pages/Bookings";

function App() {
  return (
    <Routes>
      {/* ================= USER ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/service/:id" element={<ServiceDetails />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<AdminBookings />} />
      </Route>
    </Routes>
  );
}

export default App;
