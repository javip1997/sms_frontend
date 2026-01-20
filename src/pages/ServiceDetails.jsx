import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById } from "../api/serviceApi";
import { isLoggedIn } from "../utils/auth";
import Footer from "../components/Footer";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    getServiceById(id).then(setService).catch(console.error);
  }, [id]);

  if (!service) return null;

  const handleBooking = () => {
    if (!isLoggedIn()) {
      navigate("/login", {
        state: {
          redirectTo: "/booking",
          serviceId: service._id,
        },
      });
    } else {
      navigate("/booking", {
        state: { serviceId: service._id },
      });
    }
  };

  return (
    <>
      <Header />
      <section className="px-10 mt-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">{service.name}</h1>
        <p className="text-xl text-blue-900 font-semibold mt-2">
          ₹{service.price}
        </p>
        <p className="text-gray-600 mt-6">
          {service.description}
        </p>

        <button
          onClick={handleBooking}
          className="mt-10 bg-blue-900 text-white px-8 py-3 rounded-md text-lg"
        >
          Book Now
        </button>
      </section>
      <Footer />
    </>
  );
};

export default ServiceDetails;
