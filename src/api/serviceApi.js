import apiClient from "./apiClient";

export const getServices = async () => {
  const res = await apiClient.get("/services");
  return res.data;
};

export const getServiceById = async (id) => {
  const res = await apiClient.get(`/services/${id}`);
  return res.data;
};

export const createService = async (data) => {
  const res = await apiClient.post("/services", data);
  return res.data;
};
