import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../api/adminCategoryApi";
import CategoryModal from "../components/CategoryModal";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [message, setMessage] = useState("");

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleCreate = async (data) => {
    await createCategory(data);
    notify("Category added successfully");
    setModalOpen(false);
    loadCategories();
  };

  const handleUpdate = async (data) => {
    await updateCategory(editCategory._id, data);
    notify("Category updated successfully");
    setEditCategory(null);
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    notify("Category deleted");
    loadCategories();
  };

  const handleToggle = async (category) => {
    await toggleCategoryStatus(category._id, !category.isActive);
    notify(
      category.isActive
        ? "Category disabled successfully"
        : "Category enabled successfully"
    );
    loadCategories();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
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
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">
                  {c.isActive ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditCategory(c);
                      setModalOpen(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleToggle(c)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    {c.isActive ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <CategoryModal
          initialData={editCategory}
          onClose={() => {
            setModalOpen(false);
            setEditCategory(null);
          }}
          onSubmit={editCategory ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
};

export default AdminCategories;
