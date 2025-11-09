// src/components/common/Input.jsx
import React from 'react';

const Input = ({ label, type = 'text', value, onChange, name, placeholder }) => {
  const styles = {
    group: { marginBottom: '1.5rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontWeight: 500 },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      boxSizing: 'border-box',
    }
  };

  return (
    <div style={styles.group}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        style={styles.input}
        required
      />
    </div>
  );
};

export default Input;