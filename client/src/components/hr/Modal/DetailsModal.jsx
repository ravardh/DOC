import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { formatDate as formatDisplayDate } from '../../../utils/date';

const DetailsModal = ({ 
  showModal, 
  selectedItem, 
  onClose, 
  formatDate, 
  getFieldLabel, 
  shouldShowField,
  interestOptions
}) => {
  if (!showModal || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[75vh] flex flex-col mx-auto my-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Details for {selectedItem.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(selectedItem).map(([key, value]) => {
              if (!shouldShowField(key) || (key === 'interests' && selectedItem.type === 'volunteer')) return null;
              
              let displayValue = value;
              // Format date fields
              if (key.toLowerCase().includes('date') || key === 'doj' || key === 'dol' || key === 'dob' || key === 'createdAt') {
                displayValue = (formatDate || formatDisplayDate)(value);
              }

              // Format boolean values
              if (typeof value === 'boolean') {
                displayValue = value ? 'Yes' : 'No';
              }

              return (
                <div key={key} className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getFieldLabel(key)}
                  </label>
                  <div className="text-gray-900">{displayValue || 'N/A'}</div>
                </div>
              );
            })}
            <div>
              <span className="font-semibold">Interests:</span>{' '}
              {interestOptions.find(opt => opt.value === selectedItem?.interests)?.label || selectedItem?.interests}
            </div>

            {/* Show remarks history */}
            {selectedItem.remarks && selectedItem.remarks.length > 0 && (
              <div className="col-span-2 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Remarks History</h3>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remark</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Added By</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedItem.remarks.map((remark, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(formatDate || formatDisplayDate)(remark.date)}
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
            )}

            {/* Show rejection reason if rejected */}
            {selectedItem.status === 'rejected' && selectedItem.rejectionReason && (
              <div className="col-span-2 mt-6 p-4 bg-red-50 rounded-md">
                <h3 className="text-lg font-medium text-red-800 mb-2">Rejection&nbsp;Reason</h3>
                <p className="text-red-700">{selectedItem.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white p-6 border-t">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;