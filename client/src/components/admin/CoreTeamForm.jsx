import React, { useState, useEffect } from 'react';
import axios from '../../config/api';
import Modal from '../common/Modal';

function CoreTeamForm({ member, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    linkedin: '',
    instagram: '',
    joiningDate: '',
    endingDate: '',
    order: 0
  });
  const [error, setError] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        position: member.position,
        linkedin: member.linkedin || '',
        instagram: member.instagram || '',
        joiningDate: member.joiningDate ? new Date(member.joiningDate).toISOString().split('T')[0] : '',
        endingDate: member.endingDate ? new Date(member.endingDate).toISOString().split('T')[0] : '',
        order: member.order
      });
      setPreviewUrl(member.profilePhotoPath || '');
    }
  }, [member]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      if (profilePhoto) {
        formDataToSend.append('profilePhoto', profilePhoto);
      }

      if (member) {
        // Update existing member
        await axios.put(`/api/admin/core-team/${member._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new member
        await axios.post('/api/admin/core-team', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={member ? 'Edit Core Team Member' : 'Add Core Team Member'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
            required
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
            required
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
          />
        </div>
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
            Instagram URL
          </label>
          <input
            type="url"
            id="instagram"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
          />
        </div>
        <div>
          <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
            Joining Date
          </label>
          <input
            type="date"
            id="joiningDate"
            value={formData.joiningDate}
            onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
            required
          />
        </div>
        <div>
          <label htmlFor="endingDate" className="block text-sm font-medium text-gray-700">
            Ending Date (Optional)
          </label>
          <input
            type="date"
            id="endingDate"
            value={formData.endingDate}
            onChange={(e) => setFormData({ ...formData, endingDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
          />
        </div>
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
            required
          />
        </div>
        <div>
          <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 block w-full"
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6F00] hover:bg-[#dc6b16] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F00]"
          >
            {member ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CoreTeamForm; 