// src/App.jsx
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthProvider';

function App() {
  const styles = {
    app: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }
  };

  return (
    // 2. Wrap your app
    <AuthProvider>
      <div style={styles.app}>
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;