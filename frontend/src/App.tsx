import {  Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePage from './pages/Profile';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
      padding: '20px',
    },
    
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'transparent',
      backdropFilter: 'none',
    },
    
    card: {
      background: '#808080',
      borderRadius: '16px',
      padding: '80px 48px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'none',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '480px',
      width: '100%',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      minHeight: '400px',
    },
    
    logoutButton: {
      position: 'absolute',
      top: '32px',
      right: '32px',
      background: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)',
      transition: 'all 0.3s ease',
      zIndex: 10,
      fontFamily: 'inherit',
    },
    
    title: {
      fontWeight: '700',
      fontSize: '32px',
      color: '#ffffff',
      marginBottom: '32px',
      letterSpacing: '-0.5px',
    },
    
    subtitle: {
      fontSize: '16px',
      color: '#e0e0e0',
      margin: '0 0 48px 0',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    
    loginButton: {
      padding: '20px 40px',
      borderRadius: '12px',
      background: '#000000',
      color: '#ffffff',
      border: 'none',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      minWidth: '160px',
      marginTop: '20px',
    },
    
    userAvatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      marginBottom: '24px',
      border: '4px solid #667eea',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
      objectFit: 'cover',
    },
    
    welcomeTitle: {
      fontWeight: '700',
      fontSize: '28px',
      color: '#ffffff',
      margin: '0 0 8px 0',
      letterSpacing: '-0.5px',
    },
    
    welcomeText: {
      fontSize: '16px',
      color: '#e0e0e0',
      margin: '0 0 24px 0',
      lineHeight: '1.5',
    },
    
    profileLink: {
      display: 'inline-block',
      color: 'white',
      fontWeight: '600',
      textDecoration: 'none',
      padding: '12px 24px',
      border: '2px solid #667eea',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      fontSize: '14px',
    },
    
    brandText: {
      color: '#000000',
      fontWeight: '600',
    },
    
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #e2e8f0',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },

    
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <Routes>
        <Route
          path="/"
          element={
            <div style={styles.container}>
              <div style={styles.overlay}></div>
              
              
              {isAuthenticated && (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  style={styles.logoutButton}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(255, 71, 87, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 71, 87, 0.3)';
                  }}
                >
                  Sign Out
                </button>
              )}

              <div style={styles.card}>
               
                {isLoading && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={styles.subtitle}>Authenticating...</p>
                  </div>
                )}

                
                {!isAuthenticated && !isLoading && (
                  <>
                    <h1 style={styles.title}>
                      Welcome to <span style={styles.brandText}>Dashboard</span>
                    </h1>
                    <p style={styles.subtitle}>
                      Access your personalized workspace with advanced analytics and insights.
                      <br />
                      Please authenticate to continue.
                    </p>
                    <button
                      onClick={() => loginWithRedirect()}
                      style={styles.loginButton}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      Sign In Securely
                    </button>
                  </>
                )}

                {/* Authenticated State */}
                {isAuthenticated && user && !isLoading && (
                  <>
                    {/* Debug info - remove this after testing */}
                    <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '10px' }}>
                      Debug: {user.picture ? 'Image URL found' : 'No image URL'} | User: {user.name || 'No name'}
                    </div>
                    
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name || 'User'}
                        style={styles.userAvatar}
                        onError={(e) => {
                          console.log('Image failed to load:', user.picture);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', user.picture);
                        }}
                      />
                    ) : (
                      <div 
                        style={{
                          ...styles.userAvatar,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#667eea',
                          fontSize: '36px',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h2 style={styles.welcomeTitle}>
                      Welcome back, {user.given_name || user.name?.split(' ')[0]}
                    </h2>
                    <p style={styles.welcomeText}>
                      You're successfully authenticated and ready to explore your dashboard.
                    </p>
                    <Link
                      to="/profile"
                      style={styles.profileLink}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.backgroundColor = '#333333';
                        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.5)';
                        e.target.style.borderColor = '#333333';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.backgroundColor = '#000000';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                        e.target.style.borderColor = '#000000';
                      }}
                    >
                      Visit A Profile →
                    </Link>
                  </>
                )}
              </div>
            </div>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;