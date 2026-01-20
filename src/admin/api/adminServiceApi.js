import apiClient from "../../api/apiClient";

export const getAdminServices = async () => {
  const res = await apiClient.get("/admin/services");
  return res.data;
};

export const createService = async (data) => {
  const res = await apiClient.post("/admin/services", data);
  return res.data;
};

export const updateService = async (id, data) => {
  const res = await apiClient.put(`/admin/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await apiClient.delete(`/admin/services/${id}`);
  return res.data;
};

export const toggleServiceStatus = async (id, isActive) => {
  const res = await apiClient.put(`/admin/services/${id}`, { isActive });
  return res.data;
};
