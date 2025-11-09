// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, type = 'button', onClick, disabled = false }) => {
  const styles = {
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: disabled ? '#6c757d' : 'var(--primary-color)',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }
  };

  return (
    <button type={type} onClick={onClick} style={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;