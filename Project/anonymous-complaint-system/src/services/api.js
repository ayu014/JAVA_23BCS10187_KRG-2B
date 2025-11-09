// src/services/api.js

// const API_BASE_URL = 'http://localhost:8080/api';
// 
const API_BASE_URL = 'https://acrs-backend.onrender.com/api';
// Function to submit a new complaint
export const submitComplaint = async (complaintData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaintData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const newComplaint = await response.json();
    return { success: true, complaint: newComplaint };
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return { success: false, message: 'Failed to submit complaint.' };
  }
};

// Function to get a complaint's status by ID
export const getComplaintStatus = async (ticketId) => {
  try {
    // THIS IS THE FIX: Call the new 'track' endpoint
    const response = await fetch(`${API_BASE_URL}/complaints/track/${ticketId}`); 
    if (response.status === 404) {
      return { success: false, message: 'Complaint ID not found.' };
    }
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const complaint = await response.json();
    return { success: true, complaint };
  } catch (error) {
    console.error('Error fetching complaint status:', error);
    return { success: false, message: 'Failed to fetch status.' };
  }
};

// Function to get all complaints for the admin dashboard

export const getAllComplaints = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Add the token
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const complaints = await response.json();
    return { success: true, complaints };
  } catch (error) {
    console.error('Error fetching all complaints:', error);
    return { success: false, message: 'Failed to fetch complaints.' };
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), // Send {username, password}
    });

    if (!response.ok) {
      return { success: false, message: 'Invalid credentials' };
    }

    const data = await response.json(); // This will be { "token": "..." }
    
    // Store the real token from the backend
    localStorage.setItem('adminToken', data.token);
    
    return { success: true, token: data.token };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login.' };
  }
};

export const updateComplaintStatus = async (id, status, remarks) => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` // Add the token
      },
      body: JSON.stringify({ status, remarks }),
    });
    if (!response.ok) { throw new Error('Failed to update status'); }
    const updatedComplaint = await response.json();
    return { success: true, complaint: updatedComplaint };
  } catch (error) {
    console.error('Error updating complaint:', error);
    return { success: false };
  }
};


export const sendNotification = async (complaintId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}/notify`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to send notification');
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false };
  }
};


export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Send the token
      }
    });
    if (!response.ok) {
      throw new Error('Could not fetch stats');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { success: false };
  }
};


const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};


