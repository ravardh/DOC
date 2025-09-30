import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';

const RejectionModal = ({
  showModal,
  selectedApplicant,
  onClose,
  onSuccess
}) => {
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showModal) {
      setReason('');
      setError(null);
    }
  }, [showModal]);

  if (!showModal || !selectedApplicant) return null;

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError('Reason required');
      return;
    }
    try {
      setSubmitting(true);
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`/api/hr/applicants/${selectedApplicant._id}`, {
        status: 'rejected',
        rejectionReason: reason.trim(),
        remarks: [{ text: reason.trim(), author: user?.email }]
      });
      onSuccess?.();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to reject');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[75vh] flex flex-col mx-auto my-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Reject Application - {selectedApplicant.name}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rejection&nbsp;Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            placeholder="Please provide detailed reason for rejection"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim() || submitting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:opacity-50"
          >
            {submitting ? 'Processing...' : 'Confirm Rejection'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;