import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="bg-blue-900 mx-6 mt-6 rounded-2xl py-24 text-center text-white relative">
        <h1 className="text-4xl font-bold">
          Expert Care. Genuine Parts.
        </h1>
        <p className="text-lg mt-3">
          One Trusted Platform.
        </p>

        {/* <div className="flex justify-center gap-4 mt-12">
          <input
            type="text"
            placeholder="Choose your location"
            className="w-72 px-4 py-3 rounded-md bg-white text-gray-800 outline-none"
          />
          <input
            type="text"
            placeholder="Search for Service, Spare & More"
            className="w-96 px-4 py-3 rounded-md bg-white text-gray-800 outline-none"
          />
        </div> */}
      </section>

      {/* ================= MAIN SERVICE CARDS ================= */}
      <section className="flex justify-center gap-10 -mt-20 px-6 relative z-10">

        {/* Home Services */}
        <div
          onClick={() =>
            navigate("/services", {
              state: { from: "home" }
            })
          }
          className="bg-white rounded-2xl shadow-xl p-8 w-[420px] cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold">
            Home Services
          </h2>
          <p className="text-gray-600 mt-1">
            On-Demand
          </p>

          <span className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
            UP TO 20% OFF ON 1ST ORDER
          </span>
        </div>

        {/* Spares */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[420px] opacity-90">
          <h2 className="text-2xl font-bold">
           Vehicle Spares
          </h2>
          <p className="text-gray-600 mt-1">
            Order Genuine and OEM Parts Online
          </p>

          <span className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
            LAUNCHING SOON..!
          </span>
        </div>
      </section>

      {/* ================= FIND YOUR HOME SERVICE ================= */}
      <section className="bg-blue-50 mt-32 mx-6 rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Find Your Home Service
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() =>
                navigate("/services", {
                  state: {
                    categoryId: cat._id,
                    categoryName: cat.name,
                  },
                })
              }
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="text-lg font-semibold">
                {cat.name}
              </h3>

              <p className="text-green-600 font-semibold mt-2">
                {cat.bookings}{" "}
                <span className="text-gray-500 font-normal">
                  Bookings
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
