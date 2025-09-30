import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';
import { formatDateForInput } from '../../../utils/date';

const OnboardingModal = ({
  showModal,
  selectedApplicant,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    assignedPosition: '',
    assignedTeam: '',
    interviewDate: '',
    doj: '',
    dol: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showModal && selectedApplicant) {
      setFormData({
        assignedPosition: selectedApplicant.assignedPosition || '',
        assignedTeam: selectedApplicant.assignedTeam || '',
        interviewDate: selectedApplicant.interviewDate || '',
        doj: '',
        dol: ''
      });
      setError(null);
    }
  }, [showModal, selectedApplicant]);

  if (!showModal || !selectedApplicant) return null;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (!formData.assignedPosition.trim() || !formData.assignedTeam.trim() || !formData.doj) {
        setError('All required fields must be filled.');
        setSubmitting(false);
        return;
      }
      await axios.put(`/api/hr/applicants/${selectedApplicant._id}`, {
        status: 'onboarded',
        assignedPosition: formData.assignedPosition.trim(),
        assignedTeam: formData.assignedTeam.trim(),
        interviewDate: formData.interviewDate ? new Date(formData.interviewDate).toISOString() : null,
        doj: formData.doj ? new Date(formData.doj).toISOString() : null,
        dol: formData.dol ? new Date(formData.dol).toISOString() : null
      });
      onSuccess?.();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to onboard.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[75vh] flex flex-col mx-auto my-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Onboard {selectedApplicant.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned Position
              </label>
              <input
                type="text"
                value={formData.assignedPosition}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedPosition: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned Team
              </label>
              <input
                type="text"
                value={formData.assignedTeam}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedTeam: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Date
              </label>
              <input
                type="date"
                value={formData.interviewDate ? formatDateForInput(formData.interviewDate) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, interviewDate: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Joining
              </label>
              <input
                type="date"
                value={formData.doj ? formatDateForInput(formData.doj) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, doj: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Leaving
              </label>
              <input
                type="date"
                value={formData.dol ? formatDateForInput(formData.dol) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, dol: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
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
              disabled={submitting}
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Complete Onboarding'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;