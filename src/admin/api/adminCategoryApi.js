import apiClient from "../../api/apiClient";

export const getCategories = async () => {
  const res = await apiClient.get("/admin/categories");
  return res.data;
};

export const createCategory = async (data) => {
  const res = await apiClient.post("/admin/categories", data);
  return res.data;
};

export const updateCategory = async (id, data) => {
  const res = await apiClient.put(`/admin/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await apiClient.delete(`/admin/categories/${id}`);
  return res.data;
};

export const toggleCategoryStatus = async (id, isActive) => {
  const res = await apiClient.put(`/admin/categories/${id}`, {
    isActive,
  });
  return res.data;
};
