// src/pages/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api'; // We will create this
import { useAuth } from '../hooks/useAuth';

const StatCard = ({ title, count }) => {
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      textAlign: 'center',
    },
    count: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      margin: 0,
    },
    title: {
      fontSize: '1rem',
      color: '#6c757d',
      marginTop: '0.5rem',
    }
  };
  return (
    <div style={styles.card}>
      <p style={styles.count}>{count}</p>
      <h3 style={styles.title}>{title}</h3>
    </div>
  );
};

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth(); // Get the token to prove we're authenticated

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return; // Don't fetch if not logged in
      const response = await getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
      setIsLoading(false);
    };
    fetchStats();
  }, [token]);

  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    placeholder: {
      backgroundColor: '#ffffff',
      padding: '4rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      textAlign: 'center',
      color: '#6c757d',
    }
  };

  if (isLoading) return <h2>Loading dashboard...</h2>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={styles.grid}>
        <StatCard title="Total Submitted" count={stats?.submitted || 0} />
        <StatCard title="In Review" count={stats?.inReview || 0} />
        <StatCard title="Total Resolved" count={stats?.resolved || 0} />
      </div>
      <div style={styles.placeholder}>
        <h3>Complaint Trends</h3>
        <p>(Graphs and other analytics will be displayed here in a future update)</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;