// src/pages/ComplaintListPage.jsx
import React, { useState, useEffect, useMemo } from 'react'; // 1. Import useMemo
import { getAllComplaints, updateComplaintStatus } from '../services/api';
import ComplaintDetailModal from '../components/common/ComplaintDetailModal';

const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All'); // 2. Add filter state

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await getAllComplaints();
      if (response.success) {
        setComplaints(response.complaints);
      }
      setIsLoading(false);
    };
    fetchComplaints();
  }, []);

  // 3. Create the filtered list
  // This will re-calculate ONLY when 'complaints' or 'filterStatus' changes
  const filteredComplaints = useMemo(() => {
    if (filterStatus === 'All') {
      return complaints;
    }
    return complaints.filter(c => c.status === filterStatus);
  }, [complaints, filterStatus]);

  const handleUpdateComplaint = async (id, status, remarks) => {
    const response = await updateComplaintStatus(id, status, remarks);
    if (response.success) {
      // Update the main list. The filtered list will update automatically.
      setComplaints(prev => prev.map(c => c.id === id ? response.complaint : c));
      setSelectedComplaint(null);
      alert('Complaint updated successfully! A notification has been sent (if an email was provided).');
    } else {
      alert('Failed to update complaint. The status may be invalid.');
    }
  };

  if (isLoading) return <h2>Loading complaints...</h2>;

  return (
    <div>
      <h1>Complaints List</h1>

      {/* 4. Add the filter UI */}
      <div style={styles.filterContainer}>
        <strong>Filter by status:</strong>
        <button 
          style={filterStatus === 'All' ? styles.filterButtonActive : styles.filterButton} 
          onClick={() => setFilterStatus('All')}>
          All
        </button>
        <button 
          style={filterStatus === 'Submitted' ? styles.filterButtonActive : styles.filterButton} 
          onClick={() => setFilterStatus('Submitted')}>
          Submitted
        </button>
        <button 
          style={filterStatus === 'In Review' ? styles.filterButtonActive : styles.filterButton} 
          onClick={() => setFilterStatus('In Review')}>
          In Review
        </button>
        <button 
          style={filterStatus === 'Resolved' ? styles.filterButtonResolvedActive : styles.filterButton} 
          onClick={() => setFilterStatus('Resolved')}>
          Resolved
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Ticket ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Submitted On</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* 5. Render the filtered list */}
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map(c => (
              <tr key={c.id}>
                <td style={styles.td}>{c.ticketId}</td>
                <td style={styles.td}>{c.title}</td>
                <td style={styles.td}>{c.status}</td>
                <td style={styles.td}>{new Date(c.submittedAt).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button onClick={() => setSelectedComplaint(c)}>View Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.noResults}>No complaints match this filter.</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedComplaint && (
        <ComplaintDetailModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdate={handleUpdateComplaint}
        />
      )}
    </div>
  );
};

// 6. Add new styles for the filter buttons
const styles = {
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '2rem', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    th: { padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', backgroundColor: '#f8f9fa' },
    td: { padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' },
    noResults: {
      padding: '2rem',
      textAlign: 'center',
      color: '#6c757d',
    },
    filterContainer: {
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    filterButton: {
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        border: '1px solid #dee2e6',
        borderRadius: '20px',
        backgroundColor: '#f8f9fa',
        cursor: 'pointer'
    },
    filterButtonActive: {
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        border: '1px solid var(--primary-color)',
        borderRadius: '20px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        cursor: 'pointer'
    }
  ,
  // Special active style for the "Resolved" filter (green)
  filterButtonResolvedActive: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    border: '1px solid #28a745',
    borderRadius: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer'
  }
};


export default ComplaintListPage;