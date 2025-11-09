// src/components/common/ComplaintCard.jsx
import React, { useState, useEffect } from 'react';

const ComplaintCard = ({ complaint }) => {
  // Move all hooks to the TOP of the component before any conditional returns
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // useEffect must also be at the top level
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Now we can do conditional returns AFTER all hooks
  if (!complaint) return null;

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '0.875rem',
      display: 'inline-block',
      letterSpacing: '0.02em',
    };
    
    switch (status.toLowerCase()) {
      case 'submitted': 
        return { ...baseStyle, backgroundColor: '#e3f2fd', color: '#1565c0' };
      case 'in review': 
        return { ...baseStyle, backgroundColor: '#fff3e0', color: '#e65100' };
      case 'resolved': 
        return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32' };
      default: 
        return { ...baseStyle, backgroundColor: '#f5f5f5', color: '#616161' };
    }
  };

  const statuses = [
    { label: 'Submitted', key: 'Submitted' },
    { label: 'In Review', key: 'In Review' },
    { label: 'Resolved', key: 'Resolved' }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === complaint.status);

  const styles = {
    card: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '0',
      marginTop: '2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
    },
    header: {
      padding: '1.5rem 2rem',
      borderBottom: '2px solid #f5f5f5',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    headerLeft: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    ticketId: {
      fontSize: '1rem',
      color: '#757575',
      fontWeight: '500',
    },
    title: {
      fontSize: '1.25rem',
      color: '#212121',
      fontWeight: '600',
      margin: 0,
    },
    statusBadge: {
      alignSelf: 'flex-start',
    },
    trackerSection: {
      padding: '2rem',
      borderBottom: '2px solid #f5f5f5',
    },
    trackerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      padding: '0 2rem',
    },
    lineContainer: {
      position: 'absolute',
      height: '2px',
      width: 'calc(100% - 4rem)',
      left: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    lineBackground: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: '#e0e0e0',
    },
    lineProgress: {
      position: 'absolute',
      height: '100%',
      backgroundColor: '#ffa726',
      width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
      transition: 'width 0.5s ease',
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 3,
      position: 'relative',
    },
    dotContainer: {
      position: 'relative',
      marginBottom: '0.75rem',
    },
    dot: {
      height: '20px',
      width: '20px',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    activeDot: {
      backgroundColor: '#ffa726',
      transform: 'scale(1.2)',
    },
    label: {
      fontSize: '0.875rem',
      color: '#757575',
      fontWeight: '500',
    },
    activeLabel: {
      color: '#212121',
      fontWeight: '600',
    },
    tooltip: {
      position: 'absolute',
      bottom: 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#424242',
      color: '#ffffff',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      whiteSpace: 'nowrap',
      zIndex: 1000,
      pointerEvents: 'none',
    },
    contentSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '2rem',
      padding: '2rem',
    },
    detailColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    sectionLabel: {
      fontSize: '1rem',
      fontWeight: '700',
      color: '#424242',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      // fontSize: '0.875rem',
    },
    detailsBox: {
      backgroundColor: '#fafafa',
      padding: '1.25rem',
      borderRadius: '10px',
      whiteSpace: 'pre-wrap',
      border: '2px solid #e0e0e0',
      lineHeight: '1.6',
      color: '#424242',
      fontSize: '0.9375rem',
      minHeight: '120px',
      flex: 1,
    },
    footer: {
      padding: '1rem 2rem',
      borderTop: '2px solid #f5f5f5',
      backgroundColor: '#fafafa',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#757575',
    },
    footerLabel: {
      fontWeight: '600',
      color: '#424242',
    },
  };

  return (
    <div style={styles.card}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.ticketId}>Ticket ID: {complaint.ticketId}</div>
          <h3 style={styles.title}>{complaint.title}</h3>
        </div>
        <div style={styles.statusBadge}>
          <span style={getStatusStyle(complaint.status)}>{complaint.status}</span>
        </div>
      </div>

      {/* Status Tracker Section */}
      <div style={styles.trackerSection}>
        <div style={styles.trackerContainer}>
          <div style={styles.lineContainer}>
            <div style={styles.lineBackground}></div>
            <div style={styles.lineProgress}></div>
          </div>
          {statuses.map((step, index) => (
            <div key={step.key} style={styles.step}>
              <div 
                style={styles.dotContainer}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div 
                  style={{
                    ...styles.dot,
                    ...(index <= currentStatusIndex ? styles.activeDot : {}),
                  }}
                ></div>
                {hoveredStep === index && (
                  <div style={styles.tooltip}>
                    {index === 0 
                      ? `Submitted: ${new Date(complaint.submittedAt).toLocaleString()}`
                      : step.label
                    }
                  </div>
                )}
              </div>
              <span 
                style={{
                  ...styles.label,
                  ...(index <= currentStatusIndex ? styles.activeLabel : {}),
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section - Horizontal Layout */}
      <div style={styles.contentSection}>
        <div style={styles.detailColumn}>
          <div style={styles.sectionLabel}>Description</div>
          <div style={styles.detailsBox}>{complaint.description}</div>
        </div>

        <div style={styles.detailColumn}>
          <div style={styles.sectionLabel}>Admin Remarks</div>
          <div style={styles.detailsBox}>
            {complaint.adminRemarks || ''}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerLabel}>Submitted On:</span>{' '}
        {new Date(complaint.submittedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default ComplaintCard;
