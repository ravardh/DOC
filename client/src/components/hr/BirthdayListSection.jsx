import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import axios from '../../config/api';

const BirthdayListSection = ({ applicants }) => {
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState([]);
  const [error, setError] = useState(null);

  // Helper function to get month name
  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };

  // Format date for display
  const formatBirthday = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()} ${getMonthName(date.getMonth())}`;
  };

  // Group applicants by birth month
  const groupByMonth = () => {
    const grouped = {};
    
    // Filter applicants with valid DOB
    const validApplicants = applicants.filter(app => app.dob);
    
    // Sort by month and then by date
    validApplicants.sort((a, b) => {
      const dateA = new Date(a.dob);
      const dateB = new Date(b.dob);
      
      // First compare months
      if (dateA.getMonth() !== dateB.getMonth()) {
        return dateA.getMonth() - dateB.getMonth();
      }
      
      // If months are the same, compare days
      return dateA.getDate() - dateB.getDate();
    });
    
    // Group by month
    validApplicants.forEach(applicant => {
      const date = new Date(applicant.dob);
      const month = date.getMonth();
      const monthName = getMonthName(month);
      
      if (!grouped[monthName]) {
        grouped[monthName] = [];
      }
      
      grouped[monthName].push(applicant);
    });
    
    return grouped;
  };

  // Send birthday wish email
  const sendBirthdayWish = async (applicant) => {
    try {
      setSending(true);
      setError(null);
      
      // Call API to send birthday wish email
      await axios.post('/api/hr/send-birthday-wish', { 
        email: applicant.email,
        name: applicant.name
      });
      
      // Update sent status
      setSentTo([...sentTo, applicant._id]);
      setSending(false);
    } catch (error) {
      console.error('Error sending birthday wish:', error);
      setError('Failed to send birthday wish. Please try again.');
      setSending(false);
    }
  };

  const groupedByMonth = groupByMonth();
  const months = Object.keys(groupedByMonth);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Birthday List</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {months.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No birthday information available.
        </div>
      ) : (
        <div className="space-y-6">
          {months.map(month => (
            <div key={month} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-medium text-blue-600 mb-3">{month}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groupedByMonth[month].map(applicant => (
                      <tr key={applicant._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{applicant.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{applicant.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatBirthday(applicant.dob)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => sendBirthdayWish(applicant)}
                            disabled={sending || sentTo.includes(applicant._id)}
                            className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${sentTo.includes(applicant._id) 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                          >
                            <FaEnvelope className="mr-1.5" />
                            {sentTo.includes(applicant._id) ? 'Wish Sent' : 'Send Birthday Wish'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BirthdayListSection;