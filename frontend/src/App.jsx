import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Welcome to CMRS</h1>
          <p>You are logged in!</p>
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;