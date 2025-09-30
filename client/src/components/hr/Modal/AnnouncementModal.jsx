import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';

const AnnouncementModal = ({
  showModal,
  selectedAnnouncement,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({ Title: '', Announcement: '', order: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showModal) {
      if (selectedAnnouncement) {
        setFormData({
          Title: selectedAnnouncement.Title || '',
            Announcement: selectedAnnouncement.Announcement || '',
          order: typeof selectedAnnouncement.order === 'number' ? selectedAnnouncement.order : 1
        });
      } else {
        setFormData({ Title: '', Announcement: '', order: 1 });
      }
      setError(null);
    }
  }, [showModal, selectedAnnouncement]);

  if (!showModal) return null;

  const handleSubmit = async () => {
    if (!formData.Title.trim() || !formData.Announcement.trim()) {
      setError('All required fields must be filled.');
      return;
    }
    try {
      setSubmitting(true);
      const payload = {
        Title: formData.Title.trim(),
        Announcement: formData.Announcement.trim(),
        order: parseInt(formData.order) || 1
      };
      if (selectedAnnouncement) {
        await axios.put(`/api/public/Announcement/${selectedAnnouncement._id}`, payload);
      } else {
        await axios.post('/api/public/Announcement', payload);
      }
      onSuccess?.();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to save announcement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[75vh] flex flex-col mx-auto my-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: e.target.value }))}
                onBlur={(e) => setFormData(prev => ({ ...prev, order: Math.max(1, parseInt(e.target.value) || 1) }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={formData.Title}
                onChange={(e) => setFormData(prev => ({ ...prev, Title: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Announcement <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                maxLength={1000}
                value={formData.Announcement}
                onChange={(e) => setFormData(prev => ({ ...prev, Announcement: e.target.value }))}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white p-6 border-t">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.Title.trim() || !formData.Announcement.trim() || submitting}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                !formData.Title.trim() || !formData.Announcement.trim() || submitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Saving...' : (selectedAnnouncement ? 'Save Changes' : 'Add Announcement')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;