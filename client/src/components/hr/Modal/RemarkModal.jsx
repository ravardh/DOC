import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';

const RemarkModal = ({ showModal, selectedApplicant, onClose, onSuccess }) => {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showModal) {
      setText('');
      setError(null);
    }
  }, [showModal]);

  if (!showModal || !selectedApplicant) return null;

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Remark required');
      return;
    }
    try {
      setSubmitting(true);
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`/api/hr/applicants/${selectedApplicant._id}`, {
        remarks: [...(selectedApplicant.remarks || []), { text: text.trim(), author: user?.email }]
      });
      onSuccess?.();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to add remark');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[60vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add Remark - {selectedApplicant.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="p-6 flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remark <span className="text-red-500">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="5"
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            placeholder="Enter a new remark..."
            required
          />
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>
        <div className="border-t p-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || submitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Save Remark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;