import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaUserEdit,
  FaUserGraduate,
  FaEnvelope,
  FaHandHoldingHeart,
  FaUserTie,
  FaCheck,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [applicants, setApplicants] = useState([]);
  const [students, setStudents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
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

  const navigate = useNavigate();

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
      const [applicantsRes, studentsRes, contactsRes] = await Promise.all([
        axios.get("/api/hr/applicants"),
        axios.get("/api/hr/students"),
        axios.get("/api/hr/contact"),
      ]);

      setApplicants(applicantsRes.data);
      setStudents(studentsRes.data);
      setContacts(contactsRes.data);
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
      
      // Set interview date when status changes to interview
      if (newStatus === "interview" && currentStatus === "pending") {
        updateData.interviewDate = new Date().toISOString();
      }
      
      // Show onboarding modal when status changes to onboarded
      if (newStatus === "onboarded" && currentStatus === "interview") {
        const applicant = applicants.find(a => a._id === id);
        setSelectedApplicant(applicant);
        // Set the onboarding data with the interview date
        setOnboardingData({
          assignedPosition: applicant.assignedPosition || "",
          assignedTeam: applicant.assignedTeam || "",
          interviewDate: applicant.interviewDate ? new Date(applicant.interviewDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          doj: "",
          dol: "",
        });
        setShowOnboardingModal(true);
        return;
      }

      await axios.put(`/api/hr/applicants/${id}`, updateData);
      fetchData();
    } catch (error) {
      setError("Error updating applicant status");
      console.error("Error updating status:", error);
    }
  };

  const handleStudentUpdate = async (id, updateData) => {
    try {
      await axios.put(`/api/hr/students/${id}`, updateData);
      setShowStudentModal(false);
      fetchData();
    } catch (error) {
      setError("Error updating student information");
      console.error("Error updating student:", error);
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
      // Even if the API call fails, we should still clear local storage and redirect
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

  // Filter applicants by type
  const volunteers = applicants.filter(
    (applicant) => applicant.type === "volunteer"
  );
  const interns = applicants.filter((applicant) => applicant.type === "intern");

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
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("volunteers")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "volunteers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaHandHoldingHeart className="inline-block mr-2" />
          Volunteers ({volunteers.length})
        </button>
        <button
          onClick={() => setActiveTab("interns")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "interns"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaUserTie className="inline-block mr-2" />
          Interns ({interns.length})
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "students"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <FaUserGraduate className="inline-block mr-2" />
          Students ({students.length})
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
          Contacts ({contacts.length})
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === "volunteers" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Volunteer Applications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Email</th>
                    <th className="px-4 py-2 text-center">Experience</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer._id} className="border-b">
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedApplicant(volunteer);
                            setShowApplicantModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {volunteer.name}
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">{volunteer.email}</td>
                      <td className="px-4 py-2 text-center">{volunteer.experience}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            volunteer.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : volunteer.status === "interview"
                              ? "bg-blue-100 text-blue-800"
                              : volunteer.status === "onboarded"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {volunteer.status ? volunteer.status[0].toUpperCase() + volunteer.status.slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setEditFormData(volunteer);
                            setShowEditModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <FaUserEdit />
                        </button>
                        <select
                          value={volunteer.status}
                          onChange={(e) =>
                            handleApplicantStatusChange(
                              volunteer._id,
                              e.target.value,
                              volunteer.status
                            )
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="interview">Interview</option>
                          <option value="onboarded">Onboarded</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "interns" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Intern Applications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Email</th>
                    <th className="px-4 py-2 text-center">Course</th>
                    <th className="px-4 py-2 text-center">College</th>
                    <th className="px-4 py-2 text-center">Duration</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interns.map((intern) => (
                    <tr key={intern._id} className="border-b">
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedApplicant(intern);
                            setShowApplicantModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {intern.name}
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">{intern.email}</td>
                      <td className="px-4 py-2 text-center">{intern.course}</td>
                      <td className="px-4 py-2 text-center">{intern.college}</td>
                      <td className="px-4 py-2 text-center">{intern.duration}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            intern.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : intern.status === "interview"
                              ? "bg-blue-100 text-blue-800"
                              : intern.status === "onboarded"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {intern.status ? intern.status[0].toUpperCase() + intern.status.slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setEditFormData(intern);
                            setShowEditModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <FaUserEdit />
                        </button>
                        <select
                          value={intern.status}
                          onChange={(e) =>
                            handleApplicantStatusChange(
                              intern._id,
                              e.target.value,
                              intern.status
                            )
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="interview">Interview</option>
                          <option value="onboarded">Onboarded</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Students</h2>
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Father's Name</th>
                    <th className="px-4 py-2 text-center">Gender</th>
                    <th className="px-4 py-2 text-center">Age</th>
                    <th className="px-4 py-2 text-center">Area</th>
                    <th className="px-4 py-2 text-center">Contact</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-b">
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowStudentModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {student.name}
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">{student.fatherName}</td>
                      <td className="px-4 py-2 text-center capitalize">{student.gender}</td>
                      <td className="px-4 py-2 text-center">{student.age}</td>
                      <td className="px-4 py-2 text-center">{student.area}</td>
                      <td className="px-4 py-2 text-center">{student.contactNumber}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowStudentModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaUserEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-gray-600">{contact.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2">{contact.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Applicant Details</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={editFormData.gender}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, gender: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={new Date(editFormData.dob).toISOString().split('T')[0]}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, dob: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <input
                      type="text"
                      value={editFormData.availability}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, availability: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Assignment Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Assignment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Position</label>
                    <input
                      type="text"
                      value={editFormData.assignedPosition || ""}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, assignedPosition: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Team</label>
                    <input
                      type="text"
                      value={editFormData.assignedTeam || ""}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, assignedTeam: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Intern-specific Information */}
              {editFormData.type === "intern" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Intern Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                      <input
                        type="text"
                        value={editFormData.course}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, course: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                      <input
                        type="text"
                        value={editFormData.college}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, college: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={editFormData.duration}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, duration: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
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
                onClick={handleEditSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboardingModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Onboarding Details</h2>
              <button
                onClick={() => setShowOnboardingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900">{selectedApplicant.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedApplicant.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <p className="text-gray-900 capitalize">{selectedApplicant.type}</p>
                  </div>
                </div>
              </div>

              {/* Assignment Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Assignment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Position</label>
                    <input
                      type="text"
                      value={onboardingData.assignedPosition}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          assignedPosition: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Team</label>
                    <input
                      type="text"
                      value={onboardingData.assignedTeam}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          assignedTeam: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter team"
                    />
                  </div>
                </div>
              </div>

              {/* Dates Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Dates Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
                    <input
                      type="date"
                      value={onboardingData.interviewDate}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          interviewDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                    <input
                      type="date"
                      value={onboardingData.doj}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          doj: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Leaving</label>
                    <input
                      type="date"
                      value={onboardingData.dol}
                      onChange={(e) =>
                        setOnboardingData({
                          ...onboardingData,
                          dol: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowOnboardingModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleOnboardingSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
              >
                <FaCheck className="mr-2" />
                Approve Onboarding
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applicant Details Modal */}
      {showApplicantModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Applicant Details</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setEditFormData(selectedApplicant);
                    setShowEditModal(true);
                    setShowApplicantModal(false);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaUserEdit className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowApplicantModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900">{selectedApplicant.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <p className="text-gray-900 capitalize">{selectedApplicant.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedApplicant.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <p className="text-gray-900 capitalize">{selectedApplicant.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-gray-900">{new Date(selectedApplicant.dob).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        selectedApplicant.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedApplicant.status === "interview"
                          ? "bg-blue-100 text-blue-800"
                          : selectedApplicant.status === "onboarded"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedApplicant.status ? selectedApplicant.status[0].toUpperCase() + selectedApplicant.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <p className="text-gray-900">{selectedApplicant.availability}</p>
                  </div>
                </div>
              </div>

              {/* Assignment Information */}
              {(selectedApplicant.assignedPosition || selectedApplicant.assignedTeam || selectedApplicant.doj) && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Assignment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedApplicant.assignedPosition && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Position</label>
                        <p className="text-gray-900">{selectedApplicant.assignedPosition}</p>
                      </div>
                    )}
                    {selectedApplicant.assignedTeam && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Team</label>
                        <p className="text-gray-900">{selectedApplicant.assignedTeam}</p>
                      </div>
                    )}
                    {selectedApplicant.doj && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                        <p className="text-gray-900">{new Date(selectedApplicant.doj).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Intern-specific Information */}
              {selectedApplicant.type === "intern" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Intern Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                      <p className="text-gray-900">{selectedApplicant.course}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                      <p className="text-gray-900">{selectedApplicant.college}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <p className="text-gray-900">{selectedApplicant.duration}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Student Details</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setEditFormData(selectedStudent);
                    setShowEditModal(true);
                    setShowStudentModal(false);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaUserEdit className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedStudent.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <p className="text-gray-900 capitalize">{selectedStudent.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <p className="text-gray-900">{selectedStudent.fatherName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                  <p className="text-gray-900">{selectedStudent.motherName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <p className="text-gray-900">{new Date(selectedStudent.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <p className="text-gray-900">{selectedStudent.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-gray-900">{selectedStudent.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <p className="text-gray-900">{selectedStudent.area}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <p className="text-gray-900">{selectedStudent.contactNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card</label>
                  <p className="text-gray-900">{selectedStudent.aadharCard || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
                  <p className="text-gray-900">{new Date(selectedStudent.admissionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <p className="text-gray-900">{selectedStudent.endDate ? new Date(selectedStudent.endDate).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admitted in School</label>
                  <p className="text-gray-900">{selectedStudent.admittedInSchool ? "Yes" : "No"}</p>
                </div>
                {selectedStudent.admittedInSchool && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                      <p className="text-gray-900">{selectedStudent.schoolName || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <p className="text-gray-900">{selectedStudent.classStudying || "N/A"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Student</h2>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto flex-1 pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={newStudent.motherName}
                    onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={newStudent.area}
                    onChange={(e) => setNewStudent({ ...newStudent, area: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={newStudent.contactNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, contactNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card</label>
                  <input
                    type="text"
                    value={newStudent.aadharCard}
                    onChange={(e) => setNewStudent({ ...newStudent, aadharCard: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newStudent.endDate}
                    onChange={(e) => setNewStudent({ ...newStudent, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.admittedInSchool}
                      onChange={(e) => setNewStudent({ ...newStudent, admittedInSchool: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Admitted in School</span>
                  </label>
                </div>
                {newStudent.admittedInSchool && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                      <input
                        type="text"
                        value={newStudent.schoolName}
                        onChange={(e) => setNewStudent({ ...newStudent, schoolName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <input
                        type="text"
                        value={newStudent.classStudying}
                        onChange={(e) => setNewStudent({ ...newStudent, classStudying: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4 pt-4 border-t">
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Student Details</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto flex-1 pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={editFormData.gender}
                    onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    value={editFormData.fatherName}
                    onChange={(e) => setEditFormData({ ...editFormData, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={editFormData.motherName}
                    onChange={(e) => setEditFormData({ ...editFormData, motherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={new Date(editFormData.dob).toISOString().split('T')[0]}
                    onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={editFormData.age}
                    onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={editFormData.address}
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={editFormData.area}
                    onChange={(e) => setEditFormData({ ...editFormData, area: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={editFormData.contactNumber}
                    onChange={(e) => setEditFormData({ ...editFormData, contactNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card</label>
                  <input
                    type="text"
                    value={editFormData.aadharCard || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, aadharCard: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editFormData.endDate ? new Date(editFormData.endDate).toISOString().split('T')[0] : ""}
                    onChange={(e) => setEditFormData({ ...editFormData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editFormData.admittedInSchool}
                      onChange={(e) => setEditFormData({ ...editFormData, admittedInSchool: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Admitted in School</span>
                  </label>
                </div>
                {editFormData.admittedInSchool && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                      <input
                        type="text"
                        value={editFormData.schoolName || ""}
                        onChange={(e) => setEditFormData({ ...editFormData, schoolName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <input
                        type="text"
                        value={editFormData.classStudying || ""}
                        onChange={(e) => setEditFormData({ ...editFormData, classStudying: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4 pt-4 border-t">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleStudentUpdate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
