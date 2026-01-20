import { useEffect, useState } from "react";
import { createService } from "../api/adminServiceApi";
import apiClient from "../../api/apiClient";

const CreateServiceForm = ({ onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await apiClient.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch failed:", err.response?.data || err.message);
    }
  };

  fetchCategories();
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(form);
    onSuccess(); // refresh services list
    setForm({ name: "", price: "", description: "", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">Add New Service</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-900 text-white px-6 py-2 rounded"
      >
        Create Service
      </button>
    </form>
  );
};

export default CreateServiceForm;
