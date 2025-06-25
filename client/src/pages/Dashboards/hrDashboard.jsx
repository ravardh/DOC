import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt, 
  FaUserFriends, 
  FaUserGraduate,
  FaUserTie,
  FaEnvelope,
  FaTimes,
  FaBullhorn,
  FaTrash,
  FaEdit as FaEditIcon
} from "react-icons/fa";
import VolunteersSection from "../../components/hr/VolunteersSection";
import InternsSection from "../../components/hr/InternsSection";
import StudentsSection from "../../components/hr/StudentsSection";
import Contacts from '../../components/admin/Contacts';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [applicants, setApplicants] = useState([]);
  const [students, setStudents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
    assignedPosition: "",
    assignedTeam: "",
    interviewDate: "",
    doj: "",
    dol: "",
  });
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    gender: "male",
    fatherName: "",
    motherName: "",
    dob: "",
    admissionDate: new Date().toISOString().split('T')[0],
    age: "",
    address: "",
    area: "",
    contactNumber: "",
    admittedInSchool: false,
    schoolName: "",
    classStudying: "",
    aadharCard: "",
    endDate: "",
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcementFormData, setAnnouncementFormData] = useState({
    Title: "",
    Announcement: "",
    order: 1
  });

  const navigate = useNavigate();

  const interestOptions = [
    { value: 'teaching', label: 'Teaching' },
    { value: 'fundraising', label: 'Fundraising' },
    { value: 'events', label: 'Event Management' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'graphic-Designing', label: 'Graphic Designing' },
    { value: 'content-writing', label: 'Content Writing' },
    { value: 'administration', label: 'Administration' },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "hr") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [applicantsRes, studentsRes, contactsRes, announcementsRes] = await Promise.all([
        axios.get("/api/hr/applicants"),
        axios.get("/api/hr/students"),
        axios.get("/api/hr/contact"),
        axios.get("/api/public/Announcement"),
      ]);

      setApplicants(applicantsRes.data);
      setStudents(studentsRes.data);
      setContacts(contactsRes.data);
      setAnnouncements(announcementsRes.data);
      setError(null);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicantStatusChange = async (id, newStatus, currentStatus) => {
    try {
      let updateData = { status: newStatus };
      const currentDate = new Date().toISOString();
      
      // Handle status transitions
      if (newStatus === "interview" && currentStatus === "pending") {
        updateData.interviewDate = currentDate;
      } else if (newStatus === "onboarded" && currentStatus === "interview") {
        const applicant = applicants.find(a => a._id === id);
        setSelectedApplicant(applicant);
        setOnboardingData({
          assignedPosition: applicant.assignedPosition || "",
          assignedTeam: applicant.assignedTeam || "",
          interviewDate: applicant.interviewDate ? new Date(applicant.interviewDate).toISOString().split('T')[0] : currentDate.split('T')[0],
          doj: "",
          dol: "",
        });
        setShowOnboardingModal(true);
        return;
      } else if (newStatus === "active" && currentStatus === "onboarded") {
        const applicant = applicants.find(a => a._id === id);
        if (!applicant.doj) {
          updateData.doj = currentDate;
        }
      } else if (newStatus === "inactive") {
        updateData.dol = currentDate;
      }

      await axios.put(`/api/hr/applicants/${id}`, updateData);
      fetchData();
    } catch (error) {
      setError("Error updating applicant status");
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/api/hr/applicants/${editFormData._id}`, editFormData);
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      setError("Error updating applicant details");
      console.error("Error updating applicant:", error);
    }
  };

  const handleOnboardingSubmit = async () => {
    try {
      await axios.put(`/api/hr/applicants/${selectedApplicant._id}`, {
        status: "onboarded",
        ...onboardingData,
      });
      setShowOnboardingModal(false);
      setOnboardingData({
        assignedPosition: "",
        assignedTeam: "",
        interviewDate: "",
        doj: "",
        dol: "",
      });
      fetchData();
    } catch (error) {
      setError("Error processing onboarding");
      console.error("Error processing onboarding:", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post("/api/hr/students", newStudent);
      setShowAddStudentModal(false);
      setNewStudent({
        name: "",
        gender: "male",
        fatherName: "",
        motherName: "",
        dob: "",
        admissionDate: new Date().toISOString().split('T')[0],
        age: "",
        address: "",
        area: "",
        contactNumber: "",
        admittedInSchool: false,
        schoolName: "",
        classStudying: "",
        aadharCard: "",
        endDate: "",
      });
      fetchData();
    } catch (error) {
      setError("Error adding student");
      console.error("Error adding student:", error);
    }
  };

  const getFieldLabel = (key) => {
    const labelMap = {
      dob: 'DATE OF BIRTH',
      doj: 'DATE OF JOINING',
      dol: 'DATE OF LEAVING',
      admittedInSchool: 'ADMITTED IN SCHOOL',
      createdAt: 'CREATED AT',
      updatedAt: 'UPDATED AT',
      __v: 'VERSION',
      _id: 'ID'
    };
    return labelMap[key] || key.toUpperCase();
  };

  const shouldShowField = (key) => {
    return !['createdAt', 'updatedAt', '__v', '_id'].includes(key);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditFormData(item);
    setShowEditModal(true);
  };

  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowEditModal(false);
    setShowOnboardingModal(false);
    setShowAddStudentModal(false);
    setSelectedItem(null);
    setEditFormData(null);
  };

  // Filter applicants by type
  const volunteers = applicants.filter(
    (applicant) => applicant.type === "volunteer"
  );
  const interns = applicants.filter((applicant) => applicant.type === "intern");

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleAnnouncementSubmit = async () => {
    try {
      // Validate required fields
      if (!announcementFormData.Title?.trim()) {
        setError("Title is required");
        return;
      }
      if (!announcementFormData.Announcement?.trim()) {
        setError("Announcement content is required");
        return;
      }

      // Ensure order is a valid number
      const orderNum = parseInt(announcementFormData.order);
      if (isNaN(orderNum) || orderNum < 1) {
        setError("Order must be a positive number");
        return;
      }

      const formData = {
        Title: announcementFormData.Title.trim(),
        Announcement: announcementFormData.Announcement.trim(),
        order: orderNum // Ensure it's a number, not a string
      };

      
      let response;
      if (selectedAnnouncement) {
        response = await axios.put(`/api/public/Announcement/${selectedAnnouncement._id}`, formData);
      } else {
        response = await axios.post("/api/public/Announcement", formData);
      }

      // Clear form and close modal
      setShowAnnouncementModal(false);
      setSelectedAnnouncement(null);
      setAnnouncementFormData({
        Title: "",
        Announcement: "",
        order: 1
      });
      setError(null);
      fetchData(); // Refresh the data
    } catch (error) {
      console.error("Error saving announcement:", {
        error,
        response: error.response,
        data: error.response?.data,
        status: error.response?.status,
        formData: announcementFormData,
        selectedId: selectedAnnouncement?._id
      });
      
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message;
      setError(`Error saving announcement: ${errorMessage}`);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`/api/public/Announcement/${id}`);
      fetchData();
    } catch (error) {
      setError("Error deleting announcement");
      console.error("Error deleting announcement:", error);
    }
  };

  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setAnnouncementFormData({
      Title: announcement.Title || "",
      Announcement: announcement.Announcement || "",
      order: typeof announcement.order === 'number' ? announcement.order : 1
    });
    setShowAnnouncementModal(true);
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
              <h1 className="text-3xl font-bold">HR Dashboard</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-4 md:flex lg:flex mb-4">
        <button
          onClick={() => setActiveTab("volunteers")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "volunteers"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaUserFriends className="mr-2" />
          Volunteers ({volunteers.length})
        </button>
        <button
          onClick={() => setActiveTab("interns")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "interns"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaUserGraduate className="mr-2" />
          Interns ({interns.length})
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "students"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaUserTie className="mr-2" />
          Students ({students.length})
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "contacts"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaEnvelope className="mr-2" />
          Contacts ({contacts.length})
        </button>
                        <button
          onClick={() => setActiveTab("announcements")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "announcements"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaBullhorn className="mr-2" />
          Announcements ({announcements.length})
                        </button>
            </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "volunteers" && (
          <VolunteersSection
            volunteers={volunteers}
            onStatusChange={handleApplicantStatusChange}
            onEdit={handleEdit}
            onViewDetails={handleViewDetails}
          />
        )}
        {activeTab === "interns" && (
          <InternsSection
            interns={interns}
            onStatusChange={handleApplicantStatusChange}
            onEdit={handleEdit}
            onOnboard={(intern) => {
                            setSelectedApplicant(intern);
              setShowOnboardingModal(true);
            }}
            onViewDetails={handleViewDetails}
          />
        )}
        {activeTab === "students" && (
          <StudentsSection
            students={students}
            onEdit={handleEdit}
            onAdd={() => setShowAddStudentModal(true)}
            onViewDetails={handleViewDetails}
          />
        )}
        {activeTab === "contacts" && (
          <Contacts
            contacts={contacts}
            onEdit={handleEdit}
            onReply={(contact) => {
              // Implement reply functionality
              console.log("Reply to contact:", contact);
            }}
          />
        )}
        {activeTab === "announcements" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Announcements</h2>
                        <button
                          onClick={() => {
                  setSelectedAnnouncement(null);
                  setAnnouncementFormData({
                    Title: "",
                    Announcement: "",
                    order: 1
                  });
                  setShowAnnouncementModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Announcement
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Announcement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {announcements.map((announcement) => (
                    <tr key={announcement._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{announcement.order}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{announcement.Title}</td>
                      <td className="px-6 py-4">{announcement.Announcement}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                        <button
                            onClick={() => handleEditAnnouncement(announcement)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FaEditIcon />
                        </button>
                        <button
                            onClick={() => handleDeleteAnnouncement(announcement._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Details for {selectedItem.name}</h2>
              <button
                  onClick={handleCloseModals}
                className="text-gray-500 hover:text-gray-700"
              >
                  <FaTimes />
              </button>
            </div>
                  </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(selectedItem).map(([key, value]) => {
                  if (!shouldShowField(key)) return null;
                  
                  let displayValue = value;
                  // Format date fields
                  if (key.toLowerCase().includes('date') || key === 'doj' || key === 'dol' || key === 'dob') {
                    displayValue = formatDate(value);
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
                    </div>
                  </div>
            <div className="sticky bottom-0 bg-white p-6 border-t">
              <div className="flex justify-end">
              <button
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit {selectedItem.name}</h2>
              <button
                  onClick={handleCloseModals}
                className="text-gray-500 hover:text-gray-700"
              >
                  <FaTimes />
              </button>
            </div>
                  </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interests
                  </label>
                  <select
                    value={editFormData?.interests || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, interests: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Interest</option>
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  </div>
                {Object.entries(selectedItem).map(([key, value]) => {
                  if (!shouldShowField(key) || key === 'interests') return null;
                  
                  let inputType = "text";
                  let inputValue = value;

                  // Handle date fields
                  if (key.toLowerCase().includes('date') || key === 'doj' || key === 'dol' || key === 'dob') {
                    inputType = "date";
                    inputValue = formatDateForInput(value);
                  }

                  // Handle boolean fields
                  if (typeof value === 'boolean') {
                    return (
                      <div key={key} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {getFieldLabel(key)}
                        </label>
                        <select
                          value={value ? 'true' : 'false'}
                          onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value === 'true' })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                  </div>
                    );
                  }

                  // Handle select fields
                  if (key === "status") {
                    return (
                      <div key={key} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {getFieldLabel(key)}
                        </label>
                        <select
                          value={value}
                          onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="interview">Interview</option>
                          <option value="onboarded">Onboarded</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                  </div>
                    );
                  }

                  // Handle type field for volunteers and interns
                  if (key === "type") {
                    return (
                      <div key={key} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {getFieldLabel(key)}
                        </label>
                        <select
                          value={value}
                          onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="volunteer">Volunteer</option>
                          <option value="intern">Intern</option>
                        </select>
                  </div>
                    );
                  }

                  return (
                    <div key={key} className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {getFieldLabel(key)}
                      </label>
                      <input
                        type={inputType}
                        value={inputValue || ""}
                        onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  );
                })}
                </div>
              </div>
            <div className="sticky bottom-0 bg-white p-6 border-t">
              <div className="flex justify-end space-x-3">
              <button
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                  Save Changes
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add New Student</h2>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(newStudent).map(([key, value]) => (
                  <div key={key} className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    {key === 'admittedInSchool' ? (
                      <select
                        value={value}
                        onChange={(e) => setNewStudent({ ...newStudent, [key]: e.target.value === 'true' })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    ) : key === 'gender' ? (
                      <select
                        value={value}
                        onChange={(e) => setNewStudent({ ...newStudent, [key]: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <input
                        type={key === 'dob' || key === 'admissionDate' || key === 'endDate' ? 'date' : 'text'}
                        value={key === 'dob' || key === 'admissionDate' || key === 'endDate' ? formatDateForInput(value) : value}
                        onChange={(e) => setNewStudent({ ...newStudent, [key]: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                      </div>
                ))}
                      </div>
                  </div>
            <div className="sticky bottom-0 bg-white p-6 border-t">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </div>
                </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboardingModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Onboard {selectedApplicant.name}</h2>
              <button
                  onClick={() => setShowOnboardingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
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
                    value={onboardingData.assignedPosition}
                    onChange={(e) => setOnboardingData({ ...onboardingData, assignedPosition: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Team
                  </label>
                  <input
                    type="text"
                    value={onboardingData.assignedTeam}
                    onChange={(e) => setOnboardingData({ ...onboardingData, assignedTeam: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={formatDateForInput(onboardingData.interviewDate)}
                    onChange={(e) => setOnboardingData({ ...onboardingData, interviewDate: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    value={formatDateForInput(onboardingData.doj)}
                    onChange={(e) => setOnboardingData({ ...onboardingData, doj: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Leaving
                  </label>
                      <input
                    type="date"
                    value={formatDateForInput(onboardingData.dol)}
                    onChange={(e) => setOnboardingData({ ...onboardingData, dol: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    </div>
              </div>
            <div className="sticky bottom-0 bg-white p-6 border-t">
              <div className="flex justify-end space-x-3">
              <button
                  onClick={() => setShowOnboardingModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                  onClick={handleOnboardingSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                  Complete Onboarding
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {selectedAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
                </h2>
              <button
                  onClick={() => {
                    setShowAnnouncementModal(false);
                    setSelectedAnnouncement(null);
                    setAnnouncementFormData({
                      Title: "",
                      Announcement: "",
                      order: 1
                    });
                    setError(null);
                  }}
                className="text-gray-500 hover:text-gray-700"
              >
                  <FaTimes />
              </button>
            </div>
                </div>
            <div className="p-6 overflow-y-auto flex-1">
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={announcementFormData.order}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = parseInt(value);
                      setAnnouncementFormData({
                        ...announcementFormData,
                        order: value === "" ? "" : Math.max(1, numValue || 1)
                      });
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      const numValue = parseInt(value);
                      setAnnouncementFormData({
                        ...announcementFormData,
                        order: Math.max(1, numValue || 1)
                      });
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={announcementFormData.Title}
                    onChange={(e) => setAnnouncementFormData({
                      ...announcementFormData,
                      Title: e.target.value
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Announcement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    maxLength={1000}
                    value={announcementFormData.Announcement}
                    onChange={(e) => setAnnouncementFormData({
                      ...announcementFormData,
                      Announcement: e.target.value
                    })}
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                </div>
                </div>
            <div className="sticky bottom-0 bg-white p-6 border-t">
              <div className="flex justify-end space-x-3">
              <button
                  onClick={() => {
                    setShowAnnouncementModal(false);
                    setSelectedAnnouncement(null);
                    setAnnouncementFormData({
                      Title: "",
                      Announcement: "",
                      order: 1
                    });
                    setError(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                  onClick={handleAnnouncementSubmit}
                  disabled={!announcementFormData.Title?.trim() || !announcementFormData.Announcement?.trim()}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    !announcementFormData.Title?.trim() || !announcementFormData.Announcement?.trim()
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {selectedAnnouncement ? 'Save Changes' : 'Add Announcement'}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
