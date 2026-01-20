import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../api/serviceApi";
import Footer from "../components/Footer";

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices).catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <section className="px-10 mt-10">
        <h1 className="text-3xl font-bold mb-8">Our Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/service/${s._id}`)}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition"
            >
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="text-gray-600 mt-2">
                Starting from ₹{s.price}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {s.category?.name}
              </p>
              <button className="mt-4 text-blue-900 font-semibold">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
