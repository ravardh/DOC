import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../../../config/api';
import { formatDateForInput, formatDateDDMMYYYY } from '../../../utils/date';

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
  const [remarkText, setRemarkText] = useState('');

  useEffect(() => {
    if (showModal && selectedItem) {
      setFormData(selectedItem);
      setError(null);
      setRemarkText(''); // ensure remark field starts empty every open
    }
  }, [showModal, selectedItem]);

  if (!showModal || !selectedItem || !formData) return null;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const cleaned = {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        gender: formData.gender || '',
        dob: formData.dob ? new Date(formData.dob).toISOString() : null,
        interests: formData.interests || '',
        availability: formData.availability || '',
        reference: formData.reference || '',
        experience: formData.experience || '',
        course: formData.course || '',
        college: formData.college || '',
        duration: formData.duration || '',
        status: formData.status || 'pending',
        assignedPosition: formData.assignedPosition || '',
        assignedTeam: formData.assignedTeam || '',
        interviewDate: formData.interviewDate ? new Date(formData.interviewDate).toISOString() : null,
        doj: formData.doj ? new Date(formData.doj).toISOString() : null,
        dol: formData.dol ? new Date(formData.dol).toISOString() : null,
        rejectionReason: formData.rejectionReason || '',
      };
      // Always treat current remark textarea as new entry if provided
      if (remarkText.trim()) {
        cleaned.remarks = [
          ...(formData.remarks || []),
          { text: remarkText.trim(), author: (JSON.parse(localStorage.getItem('user'))?.email) }
        ];
      }
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
            {/* Applied On */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Applied On</label>
              <input
                type="text"
                value={formData?.createdAt ? formatDateDDMMYYYY(formData.createdAt) : ''}
                readOnly
                className="w-full rounded-md border-gray-200 bg-gray-50 text-gray-700 px-4 py-2 cursor-not-allowed"
              />
            </div>
            {/* INTERESTS */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">INTERESTS</label>
              <select
                value={formData?.interests || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Interest</option>
                {interestOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            {/* TYPE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">TYPE</label>
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="volunteer">Volunteer</option>
                <option value="intern">Intern</option>
              </select>
            </div>
            {/* NAME */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">NAME</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* EMAIL */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* PHONE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">PHONE</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* GENDER */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">GENDER</label>
              <select
                value={formData.gender || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* DATE OF BIRTH */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">DATE OF BIRTH</label>
              <input
                type="date"
                value={formData.dob ? formatDateForInput(formData.dob) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* STATUS */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">STATUS</label>
              <select
                value={formData.status || 'pending'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
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
            {/* AVAILABILITY */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">AVAILABILITY</label>
              <input
                type="text"
                value={formData.availability || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* REFERENCE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">REFERENCE</label>
              <input
                type="text"
                value={formData.reference || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* COURSE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">COURSE</label>
              <input
                type="text"
                value={formData.course || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* COLLEGE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">COLLEGE</label>
              <input
                type="text"
                value={formData.college || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* DURATION */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">DURATION</label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* ASSIGNEDPOSITION */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ASSIGNEDPOSITION</label>
              <input
                type="text"
                value={formData.assignedPosition || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedPosition: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* ASSIGNEDTEAM */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ASSIGNEDTEAM</label>
              <input
                type="text"
                value={formData.assignedTeam || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedTeam: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* INTERVIEWDATE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">INTERVIEWDATE</label>
              <input
                type="date"
                value={formData.interviewDate ? formatDateForInput(formData.interviewDate) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, interviewDate: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* DATE OF JOINING */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">DATE OF JOINING</label>
              <input
                type="date"
                value={formData.doj ? formatDateForInput(formData.doj) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, doj: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* DATE OF LEAVING */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">DATE OF LEAVING</label>
              <input
                type="date"
                value={formData.dol ? formatDateForInput(formData.dol) : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, dol: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              />
            </div>
            {/* REJECTION REASON (only if rejected) */}
            {formData.status === 'rejected' && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">REJECTION REASON</label>
                <textarea
                  value={formData.rejectionReason || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, rejectionReason: e.target.value }))}
                  rows="3"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                  placeholder="Enter rejection reason"
                />
              </div>
            )}
            {/* REMARKS (always empty for new remark) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">REMARKS</label>
              <textarea
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                rows="3"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                placeholder="Enter new remark"
              />
            </div>
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