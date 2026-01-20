import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../api/bookingApi";

const Booking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const serviceId = state?.serviceId;

  const [address, setAddress] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const handleSubmit = async () => {
    await createBooking({
      serviceId,
      address,
      bookingDate,
    });
    navigate("/my-bookings");
  };

  return (
    <>
      <Header />
      <section className="max-w-3xl mx-auto mt-12 px-6">
        <h1 className="text-3xl font-bold mb-6">Book Service</h1>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <textarea
            placeholder="Service Address"
            className="w-full border p-3 rounded mb-4"
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="date"
            className="w-full border p-3 rounded mb-6"
            onChange={(e) => setBookingDate(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-900 text-white py-3 rounded"
          >
            Confirm Booking
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Booking;
