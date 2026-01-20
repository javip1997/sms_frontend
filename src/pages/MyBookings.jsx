import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getMyBookings } from "../api/bookingApi";
import Footer from "../components/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings().then(setBookings);
  }, []);

  return (
    <>
      <Header />
      <section className="px-10 mt-10">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-6 rounded-xl shadow mb-4"
          >
            <h2 className="text-xl font-semibold">
              {b.serviceId.name}
            </h2>
            <p className="text-gray-600">₹{b.serviceId.price}</p>
            <p className="text-sm text-gray-500">
              {new Date(b.bookingDate).toDateString()}
            </p>
            <p className="font-semibold text-blue-900">
              {b.status}
            </p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default MyBookings;
