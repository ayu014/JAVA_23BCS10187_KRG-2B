// src/components/common/ComplaintDetailModal.jsx
import React, {useState } from 'react';
import Button from './Button';

const ComplaintDetailModal = ({ complaint, onClose, onUpdate }) => {
  const [status, setStatus] = useState(complaint.status);
  const [remarks, setRemarks] = useState(complaint.adminRemarks || '');



  // This function determines the next possible status
  const getNextStatus = () => {
    if (complaint.status === 'Submitted') return 'In Review';
    if (complaint.status === 'In Review') return 'Resolved';
    return null; // If status is 'Resolved', no more changes are possible
  };


  const nextStatus = getNextStatus();

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>&times;</button>
        <h2>Complaint Details</h2>
        <p><strong>Ticket ID:</strong> {complaint.ticketId}</p>
        <p><strong>Title:</strong> {complaint.title}</p>
        <p><strong>Description:</strong></p>
        <div style={styles.detailsBox}>{complaint.description}</div>
        <p><strong>Current Status:</strong> {complaint.status}</p>
        <hr style={styles.hr} />
        
        <h4>Actions</h4>
        {nextStatus ? (
          <>
            <p>Change status to:</p>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
              <option value={complaint.status}>{complaint.status}</option>
              <option value={nextStatus}>{nextStatus}</option>
            </select>
            
            <p style={{ marginTop: '1rem' }}>Add/Edit Remarks:</p>
            <textarea 
              value={remarks} 
              onChange={(e) => setRemarks(e.target.value)}
              style={styles.textarea}
              placeholder="Provide details about the status change..."
            />
            <div style={styles.buttonGroup}>
              <Button onClick={() => onUpdate(complaint.id, status, remarks)}>Save Changes</Button>
            </div>
          </>
        ) : (
          <p>This complaint is resolved. No further actions are possible.</p>
        )}
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', position: 'relative' },
    closeButton: { position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' },
    detailsBox: { backgroundColor: '#f8f9fa', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e9ecef', whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' },
    hr: { border: 'none', borderTop: '1px solid #e9ecef', margin: '1rem 0' },
    select: { width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #dee2e6', borderRadius: '4px' },
    textarea: { width: '100%', minHeight: '80px', padding: '0.75rem', fontSize: '1rem', border: '1px solid #dee2e6', borderRadius: '4px' },
    buttonGroup: { display: 'flex', gap: '1rem', marginTop: '1rem' }
};

export default ComplaintDetailModal;