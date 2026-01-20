import apiClient from "./apiClient";

export const getCategories = async () => {
  const res = await apiClient.get("/categories");
  return res.data;
};

export const createCategory = async (data) => {
  const res = await apiClient.post("/categories", data);
  return res.data;
};