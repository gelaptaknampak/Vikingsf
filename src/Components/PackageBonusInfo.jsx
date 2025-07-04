import React, { useState, useEffect } from 'react';
import api from '../Components/api'; // Pastikan path ini sesuai dengan lokasi file api.js kamu

const PackageBonusInfo = () => {
  const [bonuses, setBonuses] = useState([]);
  const [formData, setFormData] = useState({ package_id: '', bonus_package_id: '' });
  const [currentItem, setCurrentItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    { label: 'Main Package ID', name: 'package_id', type: 'number', required: true, placeholder: 'Enter Main Package ID' },
    { label: 'Bonus Package ID', name: 'bonus_package_id', type: 'number', required: true, placeholder: 'Enter Bonus Package ID' },
  ];

  const fetchBonuses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/donation/package-bonuses');
      setBonuses(Array.isArray(response.data) ? response.data : []);
      setToastMessage('Package Bonus data loaded successfully.');
      setToastType('success');
    } catch (error) {
      if (error.response?.status === 404) {
        setBonuses([]);
        setToastMessage('No package bonus data found.');
        setToastType('info');
      } else {
        setBonuses([]);
        setToastMessage(`Failed to fetch Package Bonus data: ${error.message}`);
        setToastType('error');
      }
    } finally {
      setShowToast(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      package_id: Number(formData.package_id),
      bonus_package_id: Number(formData.bonus_package_id),
    };

    try {
      if (currentItem) {
        await api.put(`/donation/package-bonuses/${currentItem.id}`, payload);
      } else {
        await api.post('/donation/package-bonuses', payload);
      }

      fetchBonuses();
      handleCloseModal();
      setToastMessage(currentItem ? 'Package Bonus updated successfully.' : 'Package Bonus added successfully.');
      setToastType('success');
    } catch (error) {
      let errMsg = 'Failed to save Package Bonus.';
      if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errMsg = Object.values(error.response.data.errors).flat().join('; ');
      }
      setToastMessage(errMsg);
      setToastType('error');
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package bonus?')) return;

    try {
      await api.delete(`/donation/package-bonuses/${id}`);
      fetchBonuses();
      setToastMessage('Package Bonus deleted successfully.');
      setToastType('success');
    } catch (error) {
      let errMsg = 'An error occurred while deleting.';
      if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      }
      setToastMessage(errMsg);
      setToastType('error');
    } finally {
      setShowToast(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') handleCloseModal();
    };
    if (showModal) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({ package_id: '', bonus_package_id: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ package_id: item.package_id, bonus_package_id: item.bonus_package_id });
    setShowModal(true);
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'info':
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Package Bonus Information</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Add Package Bonus
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Main Package ID</th>
              <th className="py-3 px-6 text-left">Bonus Package ID</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4 text-gray-500">Loading...</td></tr>
            ) : bonuses.length > 0 ? (
              bonuses.map((bonus, index) => (
                <tr
                  key={bonus.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{bonus.id}</td>
                  <td className="py-3 px-6 text-left">{bonus.package_id}</td>
                  <td className="py-3 px-6 text-left">{bonus.bonus_package_id}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleEdit(bonus)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleDelete(bonus.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center py-4 text-gray-500 italic">No package bonus data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50 transition-opacity duration-300 ease-out"
          onClick={handleCloseModal}
        >
          <div
            className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentItem ? 'Edit Package Bonus' : 'Add Package Bonus'}
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
                  <label htmlFor={field.name} className="block text-gray-700 text-sm font-bold mb-2">
                    {field.label}
                  </label>
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
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Saving...' : (currentItem ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideInFromRight">
          <div className={`${getToastColor(toastType)} text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105`}>
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

export default PackageBonusInfo;
