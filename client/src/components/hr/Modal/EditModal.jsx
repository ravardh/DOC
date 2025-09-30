import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';
import { formatDateForInput } from '../../../utils/date';

const EditModal = ({
  showModal,
  selectedItem,
  onClose,
  onSuccess,
  getFieldLabel,
  shouldShowField,
  interestOptions
}) => {
  const [formData, setFormData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showModal && selectedItem) {
      setFormData(selectedItem);
      setError(null);
    }
  }, [showModal, selectedItem]);

  if (!showModal || !selectedItem || !formData) return null;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const cleaned = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (['_id','__v','updatedAt','createdAt'].includes(key)) return;
        if (key.toLowerCase().includes('date') || ['doj','dol','dob'].includes(key)) {
          cleaned[key] = value ? new Date(value).toISOString() : null;
        } else {
          cleaned[key] = value;
        }
      });
      await axios.put(`/api/hr/applicants/${formData._id}`, cleaned);
      onSuccess?.();
      onClose();
    } catch (e) {
      setError('Failed to update.');
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[75vh] flex flex-col mx-auto my-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit {selectedItem.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests
              </label>
              <select
                value={formData?.interests ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Interest</option>
                {interestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {Object.entries(formData).map(([key, value]) => {
              if (!shouldShowField(key) || key === 'interests') return null;

              let inputType = "text";
              let inputValue = value;

              // Handle date fields
              if (key.toLowerCase().includes('date') || key === 'doj' || key === 'dol' || key === 'dob') {
                inputType = "date";
                inputValue = value ? formatDateForInput(value) : '';
              }

              // Handle boolean fields
              if (typeof value === 'boolean') {
                return (
                  <div key={key} className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {getFieldLabel(key)}
                    </label>
                    <select
                      value={value ? 'true' : 'false'}
                      onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value === 'true' }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                );
              }

              // Handle select fields
              if (key === "status") {
                return (
                  <div key={key} className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {getFieldLabel(key)}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="interview">Interview</option>
                      <option value="onboarded">Onboarded</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                );
              }

              // Handle type field
              if (key === "type") {
                return (
                  <div key={key} className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {getFieldLabel(key)}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="volunteer">Volunteer</option>
                      <option value="intern">Intern</option>
                    </select>
                  </div>
                );
              }

              return (
                <div key={key} className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getFieldLabel(key)}
                  </label>
                  <input
                    type={inputType}
                    value={inputValue ?? ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        [key]: inputType === 'date' && newValue ? new Date(newValue).toISOString() : newValue
                      }));
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                  />
                </div>
              );
            })}

            {/* Show rejection reason input if status is rejected */}
            {formData?.status === 'rejected' && (
              <div className="col-span-2 mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection&nbsp;Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData?.rejectionReason || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, rejectionReason: e.target.value }))}
                  rows="4"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                  placeholder="Please provide detailed reason for rejection"
                  required
                />
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white p-6 border-t">
          <div className="flex justify-end space-x-3">
            {error && <span className="text-sm text-red-600 mr-auto">{error}</span>}
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;