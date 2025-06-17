import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUserEdit,
  FaEnvelope,
  FaUsers,
  FaDonate,
  FaUserFriends,
  FaSignOutAlt,
  FaFileAlt,
} from "react-icons/fa";
import UserForm from "../../components/admin/UserForm";
import CoreTeamForm from "../../components/admin/CoreTeamForm";
import DonationRecords from "../../components/admin/DonationRecords";
import Contacts from "../../components/admin/Contacts";
import PublicationManager from "../../components/admin/PublicationManager";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import Gallery from "../../components/admin/Gallery";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [coreTeam, setCoreTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCoreTeamModal, setShowCoreTeamModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCoreTeam, setSelectedCoreTeam] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showCoreTeamForm, setShowCoreTeamForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, donationsRes, coreTeamRes] = await Promise.all([
        axios.get("/api/admin/users"),
        axios.get("/api/public/donations"),
        axios.get("/api/admin/coreteam"),
      ]);

      setUsers(usersRes.data);
      setDonations(donationsRes.data);
      setCoreTeam(coreTeamRes.data);
      setError(null);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async (id, updateData) => {
    try {
      await axios.put(`/api/admin/users/${id}`, updateData);
      setShowUserModal(false);
      fetchData();
    } catch (error) {
      setError("Error updating user information");
      console.error("Error updating user:", error);
    }
  };

  const handleCoreTeamUpdate = async (id, updateData) => {
    try {
      await axios.put(`/api/admin/core-team/${id}`, updateData);
      setShowCoreTeamModal(false);
      fetchData();
    } catch (error) {
      setError("Error updating core team member");
      console.error("Error updating core team:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleDeleteCoreTeamMember = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this core team member?")
    ) {
      try {
        await axios.delete(`/api/admin/coreteam/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting core team member:", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Even if the API call fails, we should still clear local storage and redirect
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaUsers className="inline-block mr-2" />
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab("donations")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "donations"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaDonate className="inline-block mr-2" />
          Donations ({donations.length})
        </button>
        <button
          onClick={() => setActiveTab("core-team")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "core-team"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaUserFriends className="inline-block mr-2" />
          Core Team ({coreTeam.length})
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "contacts"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaEnvelope className="inline-block mr-2" />
          Contacts
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "gallery"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <ImageIcon className="inline-block mr-2" />
          Gallery
        </button>
        <button
          onClick={() => setActiveTab("publications")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "publications"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaFileAlt className="inline-block mr-2" />
          Publications
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {activeTab === "users" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Users</h3>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setShowUserForm(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center">Email</th>
                    <th className="px-4 py-2 text-center">Role</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-center">{user.email}</td>
                      <td className="px-4 py-2 text-center capitalize">
                        {user.role}
                      </td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserForm(true);
                          }}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
        )}

        {activeTab === "core-team" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Core Team</h3>
              <button
                onClick={() => {
                  setSelectedMember(null);
                  setShowCoreTeamForm(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Add Member
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Position</th>
                    <th className="px-4 py-2 text-center">LinkedIn</th>
                    <th className="px-4 py-2 text-center">Instagram</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coreTeam.map((member) => (
                    <tr key={member._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-center">{member.name}</td>
                      <td className="px-4 py-2 text-center">
                        {member.position}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {member.instagram ? (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setShowCoreTeamForm(true);
                          }}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCoreTeamMember(member._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
        )}

        {activeTab === "donations" && <DonationRecords />}
        {activeTab === "contacts" && <Contacts />}

        {activeTab === "gallery" && <Gallery />}

        {activeTab === "publications" && <PublicationManager />}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                User Details
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setEditFormData(selectedUser);
                    setShowEditModal(true);
                    setShowUserModal(false);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaUserEdit className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <p className="text-gray-900 capitalize">
                      {selectedUser.role}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedUser.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Core Team Details Modal */}
      {showCoreTeamModal && selectedCoreTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Core Team Member Details
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setEditFormData(selectedCoreTeam);
                    setShowEditModal(true);
                    setShowCoreTeamModal(false);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaUserEdit className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowCoreTeamModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedCoreTeam.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <p className="text-gray-900">{selectedCoreTeam.position}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedCoreTeam.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedCoreTeam.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Joining
                    </label>
                    <p className="text-gray-900">
                      {new Date(
                        selectedCoreTeam.dateOfJoining
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Leaving
                    </label>
                    <p className="text-gray-900">
                      {selectedCoreTeam.dateOfLeaving
                        ? new Date(
                            selectedCoreTeam.dateOfLeaving
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-gray-900">{selectedCoreTeam.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <p className="text-gray-900">{selectedCoreTeam.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {activeTab === "users" ? "Edit User" : "Edit Core Team Member"}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {activeTab === "users" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={editFormData.role}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          role: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="hr">HR</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={editFormData.position}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          position: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Joining
                    </label>
                    <input
                      type="date"
                      value={
                        new Date(editFormData.dateOfJoining)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          dateOfJoining: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Leaving
                    </label>
                    <input
                      type="date"
                      value={
                        editFormData.dateOfLeaving
                          ? new Date(editFormData.dateOfLeaving)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          dateOfLeaving: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={editFormData.address}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={editFormData.bio}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          bio: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeTab === "users") {
                    handleUserUpdate(editFormData._id, editFormData);
                  } else {
                    handleCoreTeamUpdate(editFormData._id, editFormData);
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Form */}
      {showUserForm && (
        <UserForm
          user={selectedUser}
          onSuccess={() => {
            setShowUserForm(false);
            fetchData();
          }}
          onCancel={() => setShowUserForm(false)}
        />
      )}

      {/* Core Team Form */}
      {showCoreTeamForm && (
        <CoreTeamForm
          member={selectedMember}
          onSuccess={() => {
            setShowCoreTeamForm(false);
            fetchData();
          }}
          onCancel={() => setShowCoreTeamForm(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
