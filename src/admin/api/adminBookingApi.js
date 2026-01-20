import apiClient from "../../api/apiClient";

export const getBookings = async () => {
  const res = await apiClient.get("/admin/bookings");
  return res.data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await apiClient.put(`/admin/bookings/${id}`, { status });
  return res.data;
};
