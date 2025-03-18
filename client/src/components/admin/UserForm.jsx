import React, { useState, useEffect } from 'react';
import axios from '../../config/api';
import Modal from '../common/Modal';

function UserForm({ user, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        password: '',
        role: user.role
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        // Update existing user
        await axios.put(`/api/admin/users/${user._id}`, formData);
      } else {
        // Create new user
        await axios.post('/api/admin/users', formData);
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
      title={user ? 'Edit User' : 'Add New User'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password {user && '(leave blank to keep current)'}
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
            required={!user}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
                   <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6F00] hover:bg-[#dc6b16] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F00]"
          >
            {user ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UserForm;
