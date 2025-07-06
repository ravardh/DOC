import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserGraduate,
  FaTimes,
  FaEdit as FaEditIcon,
  FaPlus,
  FaEye
} from "react-icons/fa";
import StudentsSection from "../../components/hr/StudentsSection";

const MemberDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
    if (!user || user.role !== "team") {
      navigate("/login");
      return;
    }
    fetchStudents();
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/team/students");
      setStudents(response.data);
    } catch (error) {
      setError("Error fetching students");
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
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

  const handleAddStudent = async () => {
    try {
      await axios.post("/api/team/students", newStudent);
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
      fetchStudents();
    } catch (error) {
      setError("Error adding student");
      console.error("Error adding student:", error);
    }
  };

  const handleEditStudent = async () => {
    try {
      await axios.put(`/api/team/students/${selectedStudent._id}`, selectedStudent);
      setShowEditStudentModal(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (error) {
      setError("Error updating student");
      console.error("Error updating student:", error);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setShowEditStudentModal(true);
  };

  const openDetailsModal = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6F00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Team Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Students Section */}
          <StudentsSection
            students={students}
            onEdit={openEditModal}
            onAdd={() => setShowAddStudentModal(true)}
            onViewDetails={openDetailsModal}
          />
        </div>
      </main>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Student</h2>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddStudent(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={newStudent.motherName}
                    onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={newStudent.contactNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, contactNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={newStudent.area}
                    onChange={(e) => setNewStudent({ ...newStudent, area: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <input
                    type="text"
                    value={newStudent.schoolName}
                    onChange={(e) => setNewStudent({ ...newStudent, schoolName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Studying</label>
                  <input
                    type="text"
                    value={newStudent.classStudying}
                    onChange={(e) => setNewStudent({ ...newStudent, classStudying: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card</label>
                  <input
                    type="text"
                    value={newStudent.aadharCard}
                    onChange={(e) => setNewStudent({ ...newStudent, aadharCard: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
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
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Student</h2>
              <button
                onClick={() => setShowEditStudentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleEditStudent(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedStudent.name}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={selectedStudent.gender}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                    value={selectedStudent.fatherName}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={selectedStudent.motherName}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, motherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={selectedStudent.dob ? selectedStudent.dob.split('T')[0] : ''}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, dob: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={selectedStudent.age}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={selectedStudent.contactNumber}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, contactNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={selectedStudent.area}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, area: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={selectedStudent.address}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <input
                    type="text"
                    value={selectedStudent.schoolName}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, schoolName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Studying</label>
                  <input
                    type="text"
                    value={selectedStudent.classStudying}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, classStudying: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card</label>
                  <input
                    type="text"
                    value={selectedStudent.aadharCard}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, aadharCard: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedStudent.admittedInSchool}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, admittedInSchool: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Admitted in School</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Student Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Name:</strong> {selectedStudent.name}</div>
                <div><strong>Gender:</strong> {selectedStudent.gender}</div>
                <div><strong>Age:</strong> {selectedStudent.age}</div>
                <div><strong>Father's Name:</strong> {selectedStudent.fatherName}</div>
                <div><strong>Mother's Name:</strong> {selectedStudent.motherName}</div>
                <div><strong>Contact:</strong> {selectedStudent.contactNumber}</div>
                <div><strong>Area:</strong> {selectedStudent.area}</div>
                <div><strong>School:</strong> {selectedStudent.schoolName}</div>
                <div><strong>Class:</strong> {selectedStudent.classStudying}</div>
                <div><strong>Aadhar:</strong> {selectedStudent.aadharCard}</div>
              </div>
              <div><strong>Address:</strong> {selectedStudent.address}</div>
              <div><strong>Date of Birth:</strong> {selectedStudent.dob ? new Date(selectedStudent.dob).toLocaleDateString() : 'N/A'}</div>
              <div><strong>Admitted in School:</strong> {selectedStudent.admittedInSchool ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
