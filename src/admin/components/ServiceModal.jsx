import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

const ServiceModal = ({ onClose, onSubmit, initialData }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    apiClient.get("/categories").then((res) => {
      setCategories(res.data);
    });

    if (initialData) {
      setForm({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description || "",
        category: initialData.category?._id,
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Service" : "Add Service"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
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
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
