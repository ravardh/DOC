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
  FaListAlt,
  FaDoorOpen,
  FaCertificate,
} from "react-icons/fa";
import {
  DetailsModal,
  EditModal,
  OnboardingModal,
  RejectionModal,
  RemarkModal,
  AnnouncementModal,
} from "../../components/hr/Modal";
import { formatDate } from "../../utils/date";
import VolunteersSection from "../../components/hr/VolunteersSection";
import InternsSection from "../../components/hr/InternsSection";
import OngoingSection from "../../components/hr/OngoingSection";
import BirthdayListSection from "../../components/hr/BirthdayListSection";
import Contacts from "../../components/admin/Contacts";

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
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [exitRequests, setExitRequests] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificateForm, setCertificateForm] = useState({
    volunteer: "",
    certificateName: "",
    issuedBy: "",
    issueDate: "",
    expiryDate: "",
    documentUrl: "",
    description: "",
  });

  const navigate = useNavigate();

  const interestOptions = [
    { value: "teaching", label: "Teaching" },
    { value: "fundraising", label: "Fundraising" },
    { value: "events", label: "Event Management" },
    { value: "social-media", label: "Social Media" },
    { value: "graphic-Designing", label: "Graphic Designing" },
    { value: "content-writing", label: "Content Writing" },
    { value: "video-editing", label: "Video Editing" },
    { value: "administration", label: "Administration" },
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
      const [applicantsRes, contactsRes, announcementsRes, exitRequestsRes, certificatesRes] =
        await Promise.all([
          axios.get("/api/hr/applicants"),
          axios.get("/api/hr/contact"),
          axios.get("/api/public/Announcement"),
          axios.get("/api/hr/exit-requests"),
          axios.get("/api/hr/certificates"),
        ]);
      setApplicants(applicantsRes.data);
      setContacts(contactsRes.data);
      setAnnouncements(announcementsRes.data);
      setExitRequests(exitRequestsRes.data);
      setCertificates(certificatesRes.data);
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
      if (newStatus === "interview" && currentStatus === "pending") {
        updateData.interviewDate = currentDate;
      } else if (newStatus === "rejected") {
        const applicant = applicants.find((a) => a._id === id);
        setSelectedApplicant(applicant);
        setShowRejectionModal(true);
        return;
      } else if (newStatus === "onboarded" && currentStatus === "interview") {
        const applicant = applicants.find((a) => a._id === id);
        setSelectedApplicant(applicant);
        setShowOnboardingModal(true);
        return;
      } else if (newStatus === "active" && currentStatus === "onboarded") {
        const applicant = applicants.find((a) => a._id === id);
        if (!applicant.doj) updateData.doj = currentDate;
      } else if (newStatus === "inactive") {
        updateData.dol = currentDate;
      }
      await axios.put(`/api/hr/applicants/${id}`, updateData);
      fetchData();
    } catch (error) {
      setError("Error updating applicant status");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const getFieldLabel = (key) => {
    const labelMap = {
      dob: "DATE OF BIRTH", doj: "DATE OF JOINING", dol: "DATE OF LEAVING",
      admittedInSchool: "ADMITTED IN SCHOOL", createdAt: "APPLIED ON",
      updatedAt: "UPDATED AT", __v: "VERSION", _id: "ID",
    };
    return labelMap[key] || key.toUpperCase();
  };

  const shouldShowField = (key) => !["updatedAt", "__v", "_id"].includes(key);
  const handleViewDetails = (item) => { setSelectedItem(item); setShowDetailsModal(true); };
  const handleEdit = (item) => { setSelectedItem(item); setShowEditModal(true); };
  const handleCloseModals = () => { setShowDetailsModal(false); setShowEditModal(false); setShowOnboardingModal(false); setSelectedItem(null); };

  const volunteers = applicants.filter((a) => a.type === "volunteer");
  const interns = applicants.filter((a) => a.type === "intern");
  const ongoingCount = applicants.filter((a) => ["pending", "interview", "onboarded"].includes(a.status)).length;

  const handleDeleteAnnouncement = async (id) => {
    try { await axios.delete(`/api/public/Announcement/${id}`); fetchData(); }
    catch (error) { setError("Error deleting announcement"); }
  };
  const handleEditAnnouncement = (a) => { setSelectedAnnouncement(a); setShowAnnouncementModal(true); };
  const handleExitRequestUpdate = async (id, status) => {
    try { await axios.put(`/api/hr/exit-requests/${id}`, { status }); fetchData(); }
    catch (error) { console.error("Error updating exit request:", error); }
  };

  const handleCertificateSubmit = async () => {
    try {
      if (selectedCertificate) {
        await axios.put(`/api/hr/certificates/${selectedCertificate._id}`, certificateForm);
      } else {
        await axios.post("/api/hr/certificates", certificateForm);
      }
      setShowCertificateModal(false);
      setSelectedCertificate(null);
      setCertificateForm({ volunteer: "", certificateName: "", issuedBy: "", issueDate: "", expiryDate: "", documentUrl: "", description: "" });
      fetchData();
    } catch (error) { console.error("Error saving certificate:", error); }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm("Delete this certificate?")) {
      try { await axios.delete(`/api/hr/certificates/${id}`); fetchData(); }
      catch (error) { console.error("Error deleting certificate:", error); }
    }
  };

  const handleEditCertificate = (cert) => {
    setSelectedCertificate(cert);
    setCertificateForm({
      volunteer: cert.volunteer?._id || cert.volunteer,
      certificateName: cert.certificateName,
      issuedBy: cert.issuedBy,
      issueDate: cert.issueDate ? cert.issueDate.split("T")[0] : "",
      expiryDate: cert.expiryDate ? cert.expiryDate.split("T")[0] : "",
      documentUrl: cert.documentUrl || "",
      description: cert.description || "",
    });
    setShowCertificateModal(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-center">
        <p className="text-xl font-semibold">{error}</p>
        <button onClick={fetchData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
          <FaSignOutAlt className="mr-2" />Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:flex lg:flex mb-4 flex-wrap">
        {[
          { key: "ongoing", icon: <FaListAlt className="mr-2" />, label: `Ongoing (${ongoingCount})` },
          { key: "volunteers", icon: <FaUserFriends className="mr-2" />, label: `Volunteers (${volunteers.length})` },
          { key: "interns", icon: <FaUserGraduate className="mr-2" />, label: `Interns (${interns.length})` },
          { key: "birthday", icon: <FaCalendarAlt className="mr-2" />, label: "Birthday List" },
          { key: "contacts", icon: <FaEnvelope className="mr-2" />, label: `Contacts (${contacts.length})` },
          { key: "announcements", icon: <FaBullhorn className="mr-2" />, label: `Announcements (${announcements.length})` },
          { key: "exitRequests", icon: <FaDoorOpen className="mr-2" />, label: `Exit Requests (${exitRequests.length})` },
          { key: "certificates", icon: <FaCertificate className="mr-2" />, label: `Certificates (${certificates.length})` },
        ].map(({ key, icon, label }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            {icon}{label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "ongoing" && <OngoingSection applicants={applicants} onStatusChange={handleApplicantStatusChange} onEdit={handleEdit} onViewDetails={handleViewDetails} onAddRemark={(a) => { setSelectedApplicant(a); setShowRemarkModal(true); }} />}
        {activeTab === "volunteers" && <VolunteersSection volunteers={volunteers} onStatusChange={handleApplicantStatusChange} onEdit={handleEdit} onViewDetails={handleViewDetails} />}
        {activeTab === "interns" && <InternsSection interns={interns} onStatusChange={handleApplicantStatusChange} onEdit={handleEdit} onOnboard={(i) => { setSelectedApplicant(i); setShowOnboardingModal(true); }} onViewDetails={handleViewDetails} />}
        {activeTab === "birthday" && <BirthdayListSection applicants={applicants} />}
        {activeTab === "contacts" && <Contacts contacts={contacts} onEdit={handleEdit} onReply={(c) => console.log("Reply:", c)} />}

        {activeTab === "announcements" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Announcements</h2>
              <button onClick={() => { setSelectedAnnouncement(null); setShowAnnouncementModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Announcement</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Announcement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {announcements.map((a) => (
                    <tr key={a._id}>
                      <td className="px-6 py-4">{a.order}</td>
                      <td className="px-6 py-4">{a.Title}</td>
                      <td className="px-6 py-4">{a.Announcement}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleEditAnnouncement(a)} className="text-indigo-600 hover:text-indigo-900"><FaEditIcon /></button>
                          <button onClick={() => handleDeleteAnnouncement(a._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "exitRequests" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Exit Requests</h2>
            {exitRequests.length === 0 ? <p className="text-gray-500">No exit requests found.</p> : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Working Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exitRequests.map((req) => (
                      <tr key={req._id}>
                        <td className="px-6 py-4">{req.volunteer?.name}</td>
                        <td className="px-6 py-4">{req.volunteer?.email}</td>
                        <td className="px-6 py-4">{req.reason}</td>
                        <td className="px-6 py-4">{formatDate(req.lastWorkingDay)}</td>
                        <td className="px-6 py-4">{req.comments || "-"}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.status === "approved" ? "bg-green-100 text-green-800" : req.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {req.status === "pending" && (
                            <div className="flex space-x-2">
                              <button onClick={() => handleExitRequestUpdate(req._id, "approved")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">Approve</button>
                              <button onClick={() => handleExitRequestUpdate(req._id, "rejected")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Certificates</h2>
              <button onClick={() => { setSelectedCertificate(null); setCertificateForm({ volunteer: "", certificateName: "", issuedBy: "", issueDate: "", expiryDate: "", documentUrl: "", description: "" }); setShowCertificateModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Certificate</button>
            </div>
            {certificates.length === 0 ? <p className="text-gray-500">No certificates found.</p> : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volunteer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issued By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((cert) => (
                      <tr key={cert._id}>
                        <td className="px-6 py-4">{cert.volunteer?.name || "-"}</td>
                        <td className="px-6 py-4">{cert.certificateName}</td>
                        <td className="px-6 py-4">{cert.issuedBy}</td>
                        <td className="px-6 py-4">{formatDate(cert.issueDate)}</td>
                        <td className="px-6 py-4">{cert.expiryDate ? formatDate(cert.expiryDate) : "-"}</td>
                        <td className="px-6 py-4">{cert.documentUrl ? <a href={cert.documentUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">View</a> : "-"}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button onClick={() => handleEditCertificate(cert)} className="text-indigo-600 hover:text-indigo-900"><FaEditIcon /></button>
                            <button onClick={() => handleDeleteCertificate(cert._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {showCertificateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{selectedCertificate ? "Edit Certificate" : "Add Certificate"}</h2>
              <button onClick={() => setShowCertificateModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volunteer ID *</label>
                <input type="text" value={certificateForm.volunteer} onChange={(e) => setCertificateForm({ ...certificateForm, volunteer: e.target.value })} placeholder="Volunteer's User ID" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name *</label>
                <input type="text" value={certificateForm.certificateName} onChange={(e) => setCertificateForm({ ...certificateForm, certificateName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issued By *</label>
                <input type="text" value={certificateForm.issuedBy} onChange={(e) => setCertificateForm({ ...certificateForm, issuedBy: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                  <input type="date" value={certificateForm.issueDate} onChange={(e) => setCertificateForm({ ...certificateForm, issueDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="date" value={certificateForm.expiryDate} onChange={(e) => setCertificateForm({ ...certificateForm, expiryDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document URL</label>
                <input type="text" value={certificateForm.documentUrl} onChange={(e) => setCertificateForm({ ...certificateForm, documentUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={certificateForm.description} onChange={(e) => setCertificateForm({ ...certificateForm, description: e.target.value })} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={() => setShowCertificateModal(false)} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleCertificateSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{selectedCertificate ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}

      <DetailsModal showModal={showDetailsModal} selectedItem={selectedItem} onClose={handleCloseModals} formatDate={formatDate} getFieldLabel={getFieldLabel} shouldShowField={shouldShowField} interestOptions={interestOptions} />
      <EditModal showModal={showEditModal} selectedItem={selectedItem} onClose={handleCloseModals} onSuccess={fetchData} getFieldLabel={getFieldLabel} shouldShowField={shouldShowField} interestOptions={interestOptions} />
      <OnboardingModal showModal={showOnboardingModal} selectedApplicant={selectedApplicant} onClose={() => setShowOnboardingModal(false)} onSuccess={fetchData} />
      <AnnouncementModal showModal={showAnnouncementModal} selectedAnnouncement={selectedAnnouncement} onClose={() => { setShowAnnouncementModal(false); setSelectedAnnouncement(null); }} onSuccess={fetchData} />
      <RejectionModal showModal={showRejectionModal} selectedApplicant={selectedApplicant} onClose={() => setShowRejectionModal(false)} onSuccess={fetchData} />
      <RemarkModal showModal={showRemarkModal} selectedApplicant={selectedApplicant} onClose={() => setShowRemarkModal(false)} onSuccess={fetchData} />
    </div>
  );
};

export default HRDashboard;