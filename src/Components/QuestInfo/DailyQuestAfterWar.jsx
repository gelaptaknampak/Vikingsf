import React, { useState, useEffect } from "react";
import api from "../api";

const DailyQuestAfterWar = () => {
  const [dailyQuestAfterWars, setDailyQuestAfterWars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    daily_quest: "",
    map: "",
    quest: "",
    reward: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");

  const formFields = [
    {
      label: "Category",
      name: "category",
      type: "text",
      required: true,
      placeholder: "Masukkan Kategori (misalnya, Harian)",
    },
    {
      label: "Image",
      name: "image",
      type: "file",
      required: false,
      multiple: false,
    },
    {
      label: "Daily Quest",
      name: "daily_quest",
      type: "text",
      required: true,
      placeholder: "Masukkan nama quest harian",
    },
    {
      label: "Map",
      name: "map",
      type: "text",
      required: true,
      placeholder: "Masukkan nama peta",
    },
    {
      label: "Quest",
      name: "quest",
      type: "textarea",
      required: false,
      placeholder:
        "Masukkan langkah-langkah quest, setiap baris baru. Contoh:\nLangkah 1\nLangkah 2",
    },
    {
      label: "Reward",
      name: "reward",
      type: "textarea",
      required: false,
      placeholder:
        "Masukkan hadiah, setiap baris baru. Contoh:\nItem A\nItem B",
    },
  ];

  useEffect(() => {
    fetchDailyQuestAfterWars();
  }, []);

  const fetchDailyQuestAfterWars = async () => {
    try {
      const response = await api.get(
        "/game-info/quest-information/dailyquestafterwar"
      );
      setDailyQuestAfterWars(response.data);
    } catch (error) {
      setToastMessage(
        `Gagal mengambil data Daily Quest After War: ${error.message}`
      );
      setToastType("error");
      setShowToast(true);
    }
  };

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
      category: "",
      daily_quest: "",
      map: "",
      quest: "",
      reward: "",
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files.length > 0 ? files[0] : null);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentItem
        ? `/game-info/quest-information/dailyquestafterwar/${currentItem.id}`
        : "/game-info/quest-information/dailyquestafterwar";

      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      if (imageFile) {
        formPayload.append("image", imageFile);
      }
      if (currentItem) {
        formPayload.append("_method", "PUT"); // override to PUT
      }

      const response = await api.post(url, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchDailyQuestAfterWars();
      handleCloseModal();
      setToastMessage(
        currentItem
          ? "Daily Quest After War berhasil diperbarui."
          : "Daily Quest After War berhasil ditambahkan."
      );
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        Object.values(error.response?.data?.errors || {})
          .flat()
          .join("; ") ||
        error.message;
      setToastMessage(`Gagal menyimpan Daily Quest After War: ${msg}`);
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      category: item.category,
      daily_quest: item.daily_quest,
      map: item.map,
      quest: item.quest,
      reward: item.reward,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(
          `/game-info/quest-information/dailyquestafterwar/${id}`
        );
        fetchDailyQuestAfterWars();
        setToastMessage("Daily Quest After War berhasil dihapus.");
        setToastType("success");
        setShowToast(true);
      } catch (error) {
        const msg = error.response?.data?.message || error.message;
        setToastMessage(`Terjadi kesalahan saat menghapus: ${msg}`);
        setToastType("error");
        setShowToast(true);
      }
    }
  };

  const renderAsOrderedList = (text) => {
    if (!text) return null;
    const items = text.split("\n").filter((item) => item.trim() !== "");
    if (items.length === 0) return null;

    return (
      <ol className="list-decimal list-inside pl-4 m-0">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
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
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Daily Quest After War
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Tambah Daily Quest
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Daily Quest</th>
              <th className="py-3 px-6 text-left">Map</th>
              <th className="py-3 px-6 text-left">Quest</th>
              <th className="py-3 px-6 text-left">Reward</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {dailyQuestAfterWars.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.id}
                </td>
                <td className="py-3 px-6 text-left">{item.category}</td>
                <td className="py-3 px-6 text-left">
                  {typeof item.image === "string" && item.image ? (
                    <img
                      src={`http://127.0.0.1:8000${item.image}`}
                      alt="Quest"
                      className="w-12 h-12 object-cover rounded-md shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/48x48/e0e0e0/555?text=Tidak Ada Gambar";
                      }}
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">
                      Tidak Ada Gambar
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-left">{item.daily_quest}</td>
                <td className="py-3 px-6 text-left">{item.map}</td>
                <td className="py-3 px-6 text-left">
                  {renderAsOrderedList(item.quest)}
                </td>
                <td className="py-3 px-6 text-left">
                  {renderAsOrderedList(item.reward)}
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
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: showModal ? 1 : 0 }}
          onClick={handleCloseModal}
        >
          <div
            className="relative p-6 bg-white w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out my-8 max-h-[90vh] overflow-y-auto"
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
                {currentItem
                  ? "Edit Daily Quest After War"
                  : "Tambah Daily Quest After War"}
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
                      rows={
                        field.name === "quest" || field.name === "reward"
                          ? 4
                          : 3
                      }
                      required={field.required}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "file" ? (
                    <>
                      <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        onChange={handleChange}
                        required={field.required && !currentItem?.image}
                        multiple={field.multiple}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {currentItem && currentItem.image && !imageFile && (
                        <p className="mt-2 text-sm text-gray-500">
                          Gambar Saat Ini:{" "}
                          <a
                            href={`http://127.0.0.1:8000${currentItem.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Lihat
                          </a>
                        </p>
                      )}
                    </>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
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

export default DailyQuestAfterWar;
