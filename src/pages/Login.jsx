import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../api/apiClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async () => {
  try {
    let res;

    if (isRegister) {
      res = await apiClient.post("/auth/signup", {
        name,
        email,
        password,
      });
    } else {
      res = await apiClient.post("/auth/login", {
        email,
        password,
      });
    }

    console.log("FULL RESPONSE:", res.data);
console.log("USER:", res.data.user);
console.log("ROLE:", res.data.user?.role);

    // Save token
    // localStorage.setItem("token", res.data.token);
    localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.user.role);

    // 🔥 ADMIN REDIRECT — MUST BE FIRST
 if (res.data.user.role === "admin") {
  window.location.href = "/admin";
  return;
}

    // 👤 NORMAL USER FLOW
    const redirectTo = location.state?.redirectTo || "/";
    const serviceId = location.state?.serviceId;

    if (redirectTo === "/booking" && serviceId) {
      navigate("/booking", { state: { serviceId }, replace: true });
    } else {
      navigate(redirectTo, { replace: true });
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <>
      <Header />

      <section className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-6">
          {isRegister ? "Create Account" : "Login"}
        </h1>

        {/* Name (Only for Register) */}
        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-4"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-900 text-white py-3 rounded"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* TOGGLE */}
        <p className="text-center text-sm mt-4">
          {isRegister ? "Already have an account?" : "New user?"}{" "}
          <span
            className="text-blue-900 cursor-pointer font-semibold"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </section>
      <Footer />
    </>
  );
};

export default Login;
