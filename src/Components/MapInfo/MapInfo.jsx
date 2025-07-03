import React, { useState, useEffect } from "react";
import api from "../api";

const MapInfo = () => {
  const [mapData, setMapData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ map_name: "" });
  const [imageFile, setImageFile] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    {
      label: "Map Name",
      name: "map_name",
      type: "text",
      required: true,
      placeholder: "Masukkan Nama Map",
    },
    {
      label: "Image",
      name: "image",
      type: "file",
      required: false,
      multiple: false,
    },
  ];

  useEffect(() => {
    fetchAllMapData();
  }, []);

  const fetchAllMapData = async () => {
    try {
      const response = await api.get("/game-info/mapinfo");
      const data = response.data;
      setMapData(Array.isArray(data) ? data : []);
      setToast("Data Map berhasil dimuat.", "success");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 404) {
        setMapData([]);
        setToast("Belum ada data Map.", "info");
      } else {
        setMapData([]);
        setToast("Gagal mengambil data Map.", "error");
      }
    }
  };

  const setToast = (message, type = "info") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({ map_name: "" });
    setImageFile(null);
    setImageRemoved(false);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files.length > 0 ? files[0] : null);
      setImageRemoved(false);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, image: null }));
    setImageRemoved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = currentItem
        ? `/game-info/mapinfo/${currentItem.id}`
        : "/game-info/mapinfo";

      const formPayload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formPayload.append(key, formData[key]);
        }
      }

      if (imageFile) {
        formPayload.append("image", imageFile);
      } else if (currentItem && imageRemoved) {
        formPayload.append("image_removed", "true");
      }

      if (currentItem) {
        formPayload.append("_method", "PUT");
      }

      await api.post(url, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchAllMapData();
      handleCloseModal();
      setToast(
        currentItem
          ? "Data Map berhasil diperbarui."
          : "Data Map berhasil ditambahkan.",
        "success"
      );
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        (error?.response?.data?.errors &&
          Object.values(error.response.data.errors).flat().join("; ")) ||
        error.message;
      setToast(`Gagal menyimpan data Map: ${msg}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      await api.delete(`/game-info/mapinfo/${id}`);
      await fetchAllMapData();
      setToast("Data Map berhasil dihapus.", "success");
    } catch (error) {
      console.error("Delete Error:", error);
      setToast("Terjadi kesalahan saat menghapus data Map.", "error");
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ map_name: item.map_name });
    setImageFile(null);
    setImageRemoved(false);
    setShowModal(true);
  };

  const getToastColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Map Information</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleShowModal}
        >
          Tambah Data Map
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Map Name</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {mapData.length > 0 ? (
              mapData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="py-3 px-6 text-left">{item.id}</td>
                  <td className="py-3 px-6 text-left">{item.map_name}</td>
                  <td className="py-3 px-6 text-left">
                    {item.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/mapinfo/${item.image}`}
                        alt="Map"
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500">Tidak Ada Gambar</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  Tidak ada data Map yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {currentItem ? "Edit Map" : "Tambah Map"}
            </h3>
            <form onSubmit={handleSubmit}>
              {formFields.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-gray-700 font-medium mb-2">
                    {field.label}
                  </label>
                  {field.type === "file" ? (
                    <>
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleChange}
                        multiple={field.multiple}
                        className="block w-full"
                      />
                      {currentItem?.image && !imageRemoved && !imageFile && (
                        <div className="mt-2">
                          <img
                            src={`http://127.0.0.1:8000/storage/mapinfo/${currentItem.image}`}
                            alt="Current"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="text-red-500 text-sm ml-2"
                          >
                            Hapus Gambar
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  {currentItem ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 p-4 text-white rounded shadow ${getToastColor(toastType)}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default MapInfo;
