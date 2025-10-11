export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const weekday = date.toLocaleString('en-IN', { weekday: 'long' });
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-IN', { month: 'short' });
  const year = date.getFullYear();
  return `${weekday}, ${day} ${month} ${year}`;
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Simple DD/MM/YYYY formatter (no weekday/month name)
export const formatDateDDMMYYYY = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2,'0');
  const month = String(d.getMonth()+1).padStart(2,'0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
