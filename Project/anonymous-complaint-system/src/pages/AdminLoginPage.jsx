// src/pages/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
// import { adminLogin } from '../services/api'; -- no use of this import
import { useAuth } from '../hooks/useAuth';

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();


  const styles = {
    container: {
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: { textAlign: 'center' }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const response = await login(credentials.username, credentials.password);
    if (response.success) {
      navigate('/admin/dashboard'); // Redirect on successful login
    } else {
      setError(response.message || 'Invalid credentials');
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default AdminLoginPage;