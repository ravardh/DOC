import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt, 
  FaUserFriends, 
  FaUserGraduate,
  FaUserTie,
  FaEnvelope,
  FaBullhorn,
  FaTrash,
  FaEdit as FaEditIcon,
  FaCalendarAlt,
  FaListAlt
} from "react-icons/fa";
import {
  DetailsModal,
  EditModal,
  OnboardingModal,
  RejectionModal,
  RemarkModal,
  AnnouncementModal
} from '../../components/hr/Modal';
import { formatDate, formatDateForInput } from '../../utils/date';
import VolunteersSection from "../../components/hr/VolunteersSection";
import InternsSection from "../../components/hr/InternsSection";
import OngoingSection from "../../components/hr/OngoingSection";
import BirthdayListSection from "../../components/hr/BirthdayListSection";
import Contacts from '../../components/admin/Contacts';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [applicants, setApplicants] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  // Removed local form states now handled inside modals
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

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
      const [applicantsRes, contactsRes, announcementsRes] = await Promise.all([
        axios.get("/api/hr/applicants"),
        axios.get("/api/hr/contact"),
        axios.get("/api/public/Announcement"),
      ]);

      setApplicants(applicantsRes.data);
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
      } else if (newStatus === "rejected") {
        const applicant = applicants.find(a => a._id === id);
        setSelectedApplicant(applicant);
        setShowRejectionModal(true);
        return;
      } else if (newStatus === "onboarded" && currentStatus === "interview") {
        const applicant = applicants.find(a => a._id === id);
        setSelectedApplicant(applicant);
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

  // Submission handlers now live in modal components

  const getFieldLabel = (key) => {
    const labelMap = {
      dob: 'DATE OF BIRTH',
      doj: 'DATE OF JOINING',
      dol: 'DATE OF LEAVING',
      admittedInSchool: 'ADMITTED IN SCHOOL',
      createdAt: 'APPLIED ON',
      updatedAt: 'UPDATED AT',
      __v: 'VERSION',
      _id: 'ID'
    };
    return labelMap[key] || key.toUpperCase();
  };

  const shouldShowField = (key) => {
    return !['updatedAt', '__v', '_id'].includes(key);
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
    setSelectedItem(null);
    setEditFormData(null);
  };

  // Filter applicants by type
  const volunteers = applicants.filter(
    (applicant) => applicant.type === "volunteer"
  );
  const interns = applicants.filter((applicant) => applicant.type === "intern");

  // formatDate & formatDateForInput now imported from utils/date

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
      <div className="grid grid-cols-2 gap-4 md:flex lg:flex mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "ongoing"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaListAlt className="mr-2" />
          Ongoing ({applicants.length})
        </button>
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
          onClick={() => setActiveTab("birthday")}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === "birthday"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaCalendarAlt className="mr-2" />
          Birthday List
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
        {activeTab === "ongoing" && (
          <OngoingSection
            applicants={applicants}
            onStatusChange={handleApplicantStatusChange}
            onEdit={handleEdit}
            onViewDetails={handleViewDetails}
            onAddRemark={(applicant) => {
              setSelectedApplicant(applicant);
              setShowRemarkModal(true);
            }}
          />
        )}
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
        {activeTab === "birthday" && (
          <BirthdayListSection
            applicants={applicants}
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

      {/* Consolidated Modal Components */}
      <DetailsModal
        showModal={showDetailsModal}
        selectedItem={selectedItem}
        onClose={handleCloseModals}
        formatDate={formatDate}
        getFieldLabel={getFieldLabel}
        shouldShowField={shouldShowField}
        interestOptions={interestOptions}
      />
      <EditModal
        showModal={showEditModal}
        selectedItem={selectedItem}
        onClose={handleCloseModals}
        onSuccess={fetchData}
        getFieldLabel={getFieldLabel}
        shouldShowField={shouldShowField}
        interestOptions={interestOptions}
      />
      <OnboardingModal
        showModal={showOnboardingModal}
        selectedApplicant={selectedApplicant}
        onClose={() => setShowOnboardingModal(false)}
        onSuccess={fetchData}
      />
      <AnnouncementModal
        showModal={showAnnouncementModal}
        selectedAnnouncement={selectedAnnouncement}
        onClose={() => {
          setShowAnnouncementModal(false);
          setSelectedAnnouncement(null);
        }}
        onSuccess={fetchData}
      />
      <RejectionModal
        showModal={showRejectionModal}
        selectedApplicant={selectedApplicant}
        onClose={() => setShowRejectionModal(false)}
        onSuccess={fetchData}
      />
      <RemarkModal
        showModal={showRemarkModal}
        selectedApplicant={selectedApplicant}
        onClose={() => setShowRemarkModal(false)}
        onSuccess={fetchData}
      />
    </div>
    
  );
};

export default HRDashboard;
