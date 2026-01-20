import { useEffect, useState } from "react";
import { getBookings, updateBookingStatus } from "../api/adminBookingApi";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const loadBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    await updateBookingStatus(bookingId, newStatus);
    notify("Booking status updated successfully");
    loadBookings();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-gray-600">Manage customer bookings</p>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
          {message}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">{b.user?.name}</div>
                  <div className="text-sm text-gray-500">{b.user?.email}</div>
                </td>

                <td className="p-3">{b.service?.name}</td>

                <td className="p-3">{b.service?.category?.name}</td>

                <td className="p-3">
                  {new Date(b.bookingDate).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      handleStatusChange(b._id, e.target.value)
                    }
                    className="border p-2 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No bookings found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
