import React, { useState, useEffect } from 'react';
import axios from '../../config/api';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/admin/UserForm';
import CoreTeamForm from '../../components/admin/CoreTeamForm';
import DonationRecords from '../../components/admin/DonationRecords';
import ContactForm from '../../components/admin/ContactForm';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [coreTeam, setCoreTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showCoreTeamForm, setShowCoreTeamForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, coreTeamResponse] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/admin/core-team')
      ]);
      setUsers(usersResponse.data);
      setCoreTeam(coreTeamResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteCoreTeam = async (memberId) => {
    if (window.confirm('Are you sure you want to remove this core team member?')) {
      try {
        await axios.delete(`/api/admin/core-team/${memberId}`);
        setCoreTeam(coreTeam.filter(member => member._id !== memberId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditCoreTeam = (member) => {
    setEditingMember(member);
    setShowCoreTeamForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F00]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-[#FF6F00] text-[#FF6F00]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('coreteam')}
              className={`${
                activeTab === 'coreteam'
                  ? 'border-[#FF6F00] text-[#FF6F00]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Core Team
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`${
                activeTab === 'donations'
                  ? 'border-[#FF6F00] text-[#FF6F00]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Donations
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`${
                activeTab === 'contact'
                  ? 'border-[#FF6F00] text-[#FF6F00]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Contact Forms
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          {activeTab === 'users' ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setShowUserForm(true);
                  }}
                  className="px-4 py-2 bg-[#FF6F00] text-white rounded-md hover:bg-[#dc6b16]"
                >
                  Add User
                </button>
              </div>
              {showUserForm && (
                <div className="mb-6">
                  <UserForm
                    user={editingUser}
                    onSuccess={() => {
                      setShowUserForm(false);
                      setEditingUser(null);
                      fetchData();
                    }}
                    onCancel={() => {
                      setShowUserForm(false);
                      setEditingUser(null);
                    }}
                  />
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'coreteam' ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Core Team Management</h2>
                <button
                  onClick={() => {
                    setEditingMember(null);
                    setShowCoreTeamForm(true);
                  }}
                  className="px-4 py-2 bg-[#FF6F00] text-white rounded-md hover:bg-[#dc6b16]"
                >
                  Add Core Team Member
                </button>
              </div>
              {showCoreTeamForm && (
                <div className="mb-6">
                  <CoreTeamForm
                    member={editingMember}
                    onSuccess={() => {
                      setShowCoreTeamForm(false);
                      setEditingMember(null);
                      fetchData();
                    }}
                    onCancel={() => {
                      setShowCoreTeamForm(false);
                      setEditingMember(null);
                    }}
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreTeam.map((member) => (
                  <div key={member._id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center space-x-4">
                      {member.profilePhotoPath && (
                        <img
                          src={member.profilePhotoPath}
                          alt={member.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-medium">{member.name}</h3>
                        <p className="text-gray-500">{member.position}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                          LinkedIn
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-800"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleEditCoreTeam(member)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCoreTeam(member._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'donations' ? (
            <div className="p-6">
              <DonationRecords />
            </div>
          ) : (
            <div className="p-6">
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
