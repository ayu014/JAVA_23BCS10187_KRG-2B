// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
// Layout
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Pages
import HomePage from '../pages/HomePage';
import SubmitComplaintPage from '../pages/SubmitComplaintPage';
import TrackStatusPage from '../pages/TrackStatusPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import ComplaintListPage from '../pages/ComplaintListPage';

const AppRoutes = () => {
  const styles = {
    container: { maxWidth: '1140px', margin: '0 auto', padding: '2rem 1rem' }
  };

  return (
    <Router>
      <Navbar />
      <main style={styles.container}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/submit-complaint" element={<SubmitComplaintPage />} />
          <Route path="/track-status" element={<TrackStatusPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* 2. Protected Admin Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/complaints" element={<ComplaintListPage />} />
            {/* You can add more admin-only routes here */}
          </Route>
          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;