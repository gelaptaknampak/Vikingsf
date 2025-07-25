import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../api";

const MapInfo = () => {
  const [mapData, setMapData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    map_name: "",
  });
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
      placeholder: "Masukkan Nama Map (misalnya, Elan Plateau)",
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
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchAllMapData = async () => {
      try {
        const response = await api.get(`/game-info/mapinfo`, { signal });

        const data = response.data;

        if (!signal.aborted) {
          if (Array.isArray(data)) {
            setMapData(data);
          } else {
            setMapData([]);
          }
          setToastMessage("Data Map berhasil dimuat.");
          setToastType("success");
          setShowToast(true);
        }
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") {
          // Request dibatalkan oleh AbortController, tidak perlu notifikasi
          return;
        }

        if (!signal.aborted) {
          if (error.response?.status === 404) {
            setMapData([]);
            setToastMessage("Belum ada data Map.");
            setToastType("info");
          } else {
            setMapData([]);
            setToastMessage(
              `Gagal mengambil data Map: ${
                error.response?.statusText || error.message
              }`
            );
            setToastType("error");
          }
          setShowToast(true);
        }
      }
    };

    fetchAllMapData();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showModal]);

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      map_name: "",
    });
    setImageFile(null);
    setImageRemoved(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files.length > 0 ? files[0] : null);
      setImageRemoved(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, image: null }));
    setImageRemoved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const url = currentItem
        ? `/game-info/mapinfo/${currentItem.id}`
        : "/game-info/mapinfo";

      const formPayload = new FormData();

      // Tambahkan data form
      for (const key in formData) {
        if (formData[key] !== null) {
          formPayload.append(key, formData[key]);
        }
      }

      // Tambahkan gambar (jika ada)
      if (imageFile) {
        formPayload.append("image", imageFile);
      } else if (currentItem && imageRemoved) {
        formPayload.append("image_removed", "true");
      }

      // Jika edit, tambahkan override method
      if (currentItem) {
        formPayload.append("_method", "PUT");
      }

      // Kirim dengan axios
      const response = await api.post(url, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Jika sukses
      await reFetchMapData();
      handleCloseModal();
      setToastMessage(
        currentItem
          ? "Data Map berhasil diperbarui."
          : "Data Map berhasil ditambahkan."
      );
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      const msg =
        error?.response?.data?.message ||
        (error?.response?.data?.errors &&
          Object.values(error.response.data.errors).flat().join("; ")) ||
        error.message;
      setToastMessage(`Gagal menyimpan data Map: ${msg}`);
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirmed) return;

    try {
      const response = await api.delete(`/game-info/mapinfo/${id}`);
      const clonedResponse = response.clone();

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await clonedResponse.text();
        throw new Error(
          `Respons tidak valid dari server (${
            response.status
          }) saat menghapus: ${rawText.substring(0, 100)}...`
        );
      }

      if (response.ok) {
        await reFetchMapData();
        setToastMessage("Data Map berhasil dihapus.");
        setToastType("success");
        setShowToast(true);
      } else {
        const errorMessage =
          data?.message ||
          (data?.errors && Object.values(data.errors).flat().join("; ")) ||
          "Gagal menghapus data Map.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      setToastMessage(
        `Terjadi kesalahan saat menghapus data Map: ${error.message}`
      );
      setToastType("error");
      setShowToast(true);
    }
  };

  // Fungsi reusable jika belum ada
  const reFetchMapData = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}`);
      if (res.ok) {
        const d = await res.json();
        setMapData(Array.isArray(d) ? d : []);
      } else {
        setMapData([]);
      }
    } catch (err) {
      console.error("Error saat re-fetch data Map:", err);
      setMapData([]);
    }
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Map Information</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Tambah Data Map
        </button>
      </div>

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
            {mapData && mapData.length > 0 ? (
              mapData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-6 text-left">{item.map_name}</td>
                  <td className="py-3 px-6 text-left">
                    {typeof item.image === "string" && item.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/mapinfo/${item.image}`}
                        alt="Gambar Map"
                        className="w-12 h-12 object-cover rounded-md shadow"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/48x48/e0e0e0/555?text=Img";
                        }}
                      />
                    ) : (
                      <span className="text-gray-500">Tidak Ada Gambar</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                  Tidak ada data Map yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: showModal ? 1 : 0 }}
          onClick={handleCloseModal}
        >
          <div
            className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out"
            style={{
              transform: showModal
                ? "translateY(0) scale(1)"
                : "translateY(-50px) scale(0.95)",
              opacity: showModal ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentItem ? `Edit Data Map` : `Tambah Data Map`}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows={3}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    ></textarea>
                  ) : field.type === "file" ? (
                    <>
                      <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        onChange={handleChange}
                        required={
                          field.required && !currentItem?.image && !imageFile
                        }
                        multiple={field.multiple}
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {currentItem?.image && !imageFile && !imageRemoved && (
                        <div className="mt-2 flex items-center">
                          <img
                            src={`http://127.0.0.1:8000/storage/mapinfo/${currentItem.image}`}
                            alt="Current"
                            className="w-20 h-20 object-cover rounded mr-2 shadow"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/80x80/e0e0e0/555?text=Img";
                            }}
                          />
                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                            onClick={handleRemoveImage}
                          >
                            Hapus Gambar
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {currentItem ? "Perbarui" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideInFromRight">
          <div
            className={`${getToastColor(
              toastType
            )} text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105`}
          >
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white text-xl leading-none font-bold opacity-75 hover:opacity-100 transition duration-150 ease-in-out"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInfo;
