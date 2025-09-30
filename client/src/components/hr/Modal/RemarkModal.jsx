import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';
import { formatDate } from '../../../utils/date';

const RemarkModal = ({
  showModal,
  selectedApplicant,
  onClose,
  onSuccess
}) => {
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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[75vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Remarks - {selectedApplicant.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remark</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Added By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedApplicant.remarks && selectedApplicant.remarks.map((remark, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(remark.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {remark.text}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {remark.author}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Remark Input */}
        <div className="border-t p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Remark <span className="text-red-500">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            placeholder="Add your remark here..."
            required
          />
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          <div className="flex justify-end space-x-3 mt-4">
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
              {submitting ? 'Adding...' : 'Add Remark'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;