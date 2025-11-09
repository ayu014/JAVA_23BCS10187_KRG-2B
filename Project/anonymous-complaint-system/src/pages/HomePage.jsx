// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // A comprehensive style object for our new, multi-section homepage
  const styles = {
    // Hero Section (Top Banner)
    hero: {
      textAlign: 'center',
      padding: '4rem 1rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      marginBottom: '3rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    },
    heroTitle: {
      fontSize: '2.8rem',
      fontWeight: 'bold',
      color: '#212529',
      marginBottom: '1rem',
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      color: '#6c757d',
      maxWidth: '700px',
      margin: '0 auto 2rem auto',
    },
    heroButton: {
      display: 'inline-block',
      padding: '0.8rem 2rem',
      fontSize: '1.1rem',
      color: '#ffffff',
      backgroundColor: 'var(--primary-color)',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
    },
    // Section Titles
    sectionTitle: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '2rem',
      color: '#343a40',
    },
    // Features Section
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
    featureTile: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      textAlign: 'center',
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: 'var(--primary-color)',
    },
    featureTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    featureDescription: {
      fontSize: '0.95rem',
      color: '#6c757d',
      lineHeight: '1.5',
    },
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>A Platform for Change, Heard Anonymously</h1>
        <p style={styles.heroSubtitle}>
          Securely submit, track, and resolve grievances within your organization without revealing your identity. We provide a transparent process to ensure your voice matters. 
        </p>
        <Link to="/submit-complaint" style={styles.heroButton}>
          Lodge a Complaint Now
        </Link>
      </section>

      {/* 2. Key Features Section */}
      <section>
        <h2 style={styles.sectionTitle}>Why Choose Our System?</h2>
        <div style={styles.featuresGrid}>
          {/* Tile 1: Anonymous Submission */}
          <div style={styles.featureTile}>
            <div style={styles.featureIcon}>🛡️</div>
            <h3 style={styles.featureTitle}>Complete Anonymity</h3>
            <p style={styles.featureDescription}>
              Your privacy is our priority. Submit complaints with the confidence that your identity is fully protected from exposure or retaliation. [cite: 12, 13]
            </p>
          </div>

          {/* Tile 2: Real-time Tracking */}
          <div style={styles.featureTile}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Real-time Status Tracking</h3>
            <p style={styles.featureDescription}>
              Use your unique complaint ID to monitor the progress of your submission from review to resolution, ensuring a transparent redressal process. [cite: 18, 19]
            </p>
          </div>

          {/* Tile 3: AI Categorization */}
          <div style={styles.featureTile}>
            <div style={styles.featureIcon}>🤖</div>
            <h3 style={styles.featureTitle}>AI-Powered Categorization</h3>
            <p style={styles.featureDescription}>
              Our intelligent system uses AI to analyze and categorize complaints by keywords, ensuring they are routed to the correct department instantly. 
            </p>
          </div>

          {/* Tile 4: Analytics Dashboard */}
          <div style={styles.featureTile}>
            <div style={styles.featureIcon}>📈</div>
            <h3 style={styles.featureTitle}>Analytics & Trend Insights</h3>
            <p style={styles.featureDescription}>
              Administrators get access to a powerful dashboard that reveals trends and patterns, helping to address systemic issues proactively. 
            </p>
          </div>
          
          {/* Tile 5: Notifications */}
          <div style={styles.featureTile}>
            <div style={styles.featureIcon}>🔔</div>
            <h3 style={styles.featureTitle}>Automated Notifications</h3>
            <p style={styles.featureDescription}>
              Opt-in to receive automated email or SMS notifications for important updates on your complaint's status, keeping you informed at every step. 
            </p>
          </div>

          {/* Tile 6: Secure Backend */}
          <div style={styles.featureTile}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Secure & Structured</h3>
            <p style={styles.featureDescription}>
              Built on a robust backend with secure admin authentication and structured data management to ensure data security and confidentiality. [cite: 17, 20]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;