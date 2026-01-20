import { useEffect, useState } from "react";
import {
  getAdminServices,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../api/adminServiceApi";
import ServiceModal from "../components/ServiceModal";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [message, setMessage] = useState("");

  const loadServices = () =>
    getAdminServices().then(setServices);

  useEffect(() => {
    loadServices();
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleCreate = async (data) => {
    await createService(data);
    showMessage("Service created successfully");
    setModalOpen(false);
    loadServices();
  };

  const handleUpdate = async (data) => {
    await updateService(editService._id, data);
    showMessage("Service updated successfully");
    setEditService(null);
    loadServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await deleteService(id);
    showMessage("Service deleted");
    loadServices();
  };

  const handleToggle = async (s) => {
    await toggleServiceStatus(s._id, !s.isActive);
    showMessage("Service status updated");
    loadServices();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + Add Service
        </button>
      </div>

      {message && (
        <div className="mb-4 text-green-700 bg-green-100 p-3 rounded">
          {message}
        </div>
      )}

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.category?.name}</td>
                <td className="p-3">₹{s.price}</td>
                <td className="p-3">
                  {s.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditService(s);
                      setModalOpen(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggle(s)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    {s.isActive ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
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

      {modalOpen && (
        <ServiceModal
          initialData={editService}
          onClose={() => {
            setModalOpen(false);
            setEditService(null);
          }}
          onSubmit={editService ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
};

export default AdminServices;
