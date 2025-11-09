// src/pages/SubmitComplaintPage.jsx
import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { submitComplaint } from '../services/api'; // Our mock API

const SubmitComplaintPage = () => {
  const [formData, setFormData] = useState({ title: '', description: '', userEmail: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'submitting', 'success'
  const [ticketId, setTicketId] = useState('');

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: { textAlign: 'center', marginBottom: '2rem' },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      boxSizing: 'border-box',
      minHeight: '120px'
    },
    successMessage: { textAlign: 'center' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
2
  const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        const response = await submitComplaint(formData);
        if (response.success) {
            setTicketId(response.complaint.ticketId);
            setSubmissionStatus('success');
            // Clear the form, including the new email field
            setFormData({ title: '', description: '', userEmail: '' });
        }
    };

  // Show a success message after submission
  if (submissionStatus === 'success') {
    return (
      <div style={styles.container}>
        <div style={styles.successMessage}>
          <h2>Complaint Submitted Successfully!</h2>
          <p>Please save your unique Complaint ID for tracking:</p>
          {/* THIS IS THE FIX: Use ticketId instead of id */}
          <p><strong>{ticketId}</strong></p> 
          <Button onClick={() => setSubmissionStatus(null)}>Submit Another Complaint</Button>
        </div>
      </div>
    );
  }

  // Show the form by default
  return (
    <div style={styles.container}>
            <h2 style={styles.title}>Submit a Complaint Anonymously</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Complaint Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Broken equipment in the lab"
                    // 'required' is implicitly true from your Input component, which is fine
                />
                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Complaint Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.textarea}
                        placeholder="Provide a detailed description of the issue."
                        required
                    />
                </div>
                
                {/* --- 2. ADD THE NEW OPTIONAL EMAIL INPUT --- */}
                <Input
                    label="Email (Optional)"
                    name="userEmail"
                    type="email" // This provides browser validation
                    value={formData.userEmail}
                    onChange={handleChange}
                    placeholder="Enter your email for notifications"
                    // We don't add 'required' here, so it's optional
                />
                {/* Add a small note for the user */}
                <p style={{fontSize: '0.85rem', color: '#6c757d', marginTop: '-1rem', marginBottom: '1.5rem'}}>
                    Providing an email is optional but will allow you to be notified when your complaint is resolved.
                </p>

                <Button type="submit" disabled={submissionStatus === 'submitting'}>
                    {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Complaint'}
                </Button>
            </form>
        </div>
  );
};

export default SubmitComplaintPage;