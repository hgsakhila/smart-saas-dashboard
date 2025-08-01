// src/components/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card p-4 shadow">
        {showLogin ? (
          <>
            <Login inline />
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <button className="btn btn-link" onClick={toggleForm}>
                Register
              </button>
            </div>
          </>
        ) : (
          <>
            <Register inline />
            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <button className="btn btn-link" onClick={toggleForm}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
