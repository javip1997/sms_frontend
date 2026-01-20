import apiClient from "./apiClient";

export const createBooking = async (data) => {
  const res = await apiClient.post("/bookings", data);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await apiClient.get("/bookings/my");
  return res.data;
};
