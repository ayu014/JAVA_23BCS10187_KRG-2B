// src/pages/TrackStatusPage.jsx
import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ComplaintCard from '../components/common/ComplaintCard';
import { getComplaintStatus } from '../services/api';

const TrackStatusPage = () => {
  const [ticketId, setTicketId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: { textAlign: 'center' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setComplaint(null);
    setError('');
    const response = await getComplaintStatus(ticketId);
    if (response.success) {
      setComplaint(response.complaint);
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Track Your Complaint</h2>
      <p>Enter the unique ID you received upon submission.</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Complaint ID"
          name="ticketId"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="e.g., TKT-2025-101"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Track Status'}
        </Button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      <ComplaintCard complaint={complaint} />
    </div>
  );
};

export default TrackStatusPage;