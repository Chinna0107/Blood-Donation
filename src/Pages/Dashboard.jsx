import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faHandHoldingHeart, faUser, faCalendarAlt, faChartLine, faBell } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#ff4444', textAlign: 'center' }}>Failed to load user data</div>
        </div>
      </div>
    );
  }

  const qrData = JSON.stringify({
    id: user.id || user._id,
    name: user.fullName || user.name,
    email: user.email,
    bloodType: user.bloodType,
    phone: user.phone,
    role: 'donor',
    timestamp: Date.now()
  });

  const quickActions = [
    { icon: faDroplet, label: 'Register as Donor', path: '/donor', color: '#dc2626' },
    { icon: faHandHoldingHeart, label: 'Request Blood', path: '/acceptor', color: '#059669' },
    { icon: faUser, label: 'View Guidelines', path: '/donor-guidelines', color: '#7c3aed' },
    { icon: faCalendarAlt, label: 'About Us', path: '/about', color: '#ea580c' }
  ];

  const stats = [
    { label: 'Donations Made', value: '0', icon: faDroplet },
    { label: 'Lives Saved', value: '0', icon: faHandHoldingHeart },
    { label: 'Requests Made', value: '0', icon: faBell },
    { label: 'Member Status', value: 'New', icon: faUser }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ marginLeft: '280px', flex: 1 }} className="dashboard-content">
        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes shimmer {
              0% { background-position: -200px 0; }
              100% { background-position: calc(200px + 100%) 0; }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.1); }
              50% { box-shadow: 0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .dashboard-card {
              animation: fadeInUp 0.6s ease-out;
              transition: all 0.3s ease;
            }
            .dashboard-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
            }
            .stat-card {
              animation: fadeInUp 0.8s ease-out;
              transition: all 0.3s ease;
            }
            .stat-card:hover {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
            }
            .action-button {
              animation: fadeInUp 1s ease-out;
              transition: all 0.3s ease;
            }
            .action-button:hover {
              transform: translateY(-3px) scale(1.05);
              box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
            }
            .qr-container {
              animation: fadeInUp 0.8s ease-out 0.3s both;
            }
            @media (max-width: 768px) {
              .dashboard-content { margin-left: 0 !important; padding-top: 80px !important; }
              .dashboard-grid { grid-template-columns: 1fr !important; }
              .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
              .actions-grid { grid-template-columns: 1fr !important; }
            }
          `}
        </style>
        
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', 
          padding: '40px', 
          position: 'relative', 
          overflow: 'hidden' 
        }}>
          {/* Animated background elements */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', top: '60%', right: '10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite reverse' }}></div>
          
          {/* Main Dashboard Card */}
          <div className="dashboard-card" style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(30px)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(255,215,0,0.15), 0 8px 32px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
            position: 'relative',
            border: '2px solid rgba(255,215,0,0.2)',
            maxWidth: '1200px',
            margin: '0 auto',
            overflow: 'hidden',
            animation: 'glow 4s ease-in-out infinite'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  color: '#FFD700', 
                  margin: '0 0 10px 0',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                }}>
                  Welcome Back, {user.fullName || user.name || 'User'}!
                </h1>
                <p style={{ 
                  fontSize: '1.1rem', 
                  opacity: 0.8, 
                  margin: 0,
                  color: '#87CEEB'
                }}>
                  Your Blood Donation Dashboard
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="dashboard-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2px 1fr',
                gap: '30px',
                alignItems: 'start'
              }}>
                {/* Left Side - Profile & Stats */}
                <div>
                  {/* Profile Section */}
                  <div style={{
                    background: '#000',
                    backdropFilter: 'blur(20px)',
                    padding: '30px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                    marginBottom: '30px',
                    border: '1px solid rgba(255,215,0,0.2)',
                    position: 'relative'
                  }}>
                    {/* Corner Pins */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                    
                    {/* Avatar with name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#000',
                        color: '#FFD700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        border: '3px solid #FFD700',
                        animation: 'pulse 2s infinite'
                      }}>
                        {(user.fullName || user.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', margin: '0', color: '#87CEEB', fontWeight: 'bold' }}>
                          {user.fullName || user.name}
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#87CEEB', margin: '0', fontWeight: '500' }}>
                          Blood Donor
                        </p>
                      </div>
                    </div>
                    
                    <hr style={{ border: 'none', height: '2px', background: 'linear-gradient(90deg, #87CEEB, transparent)', margin: '20px 0', borderRadius: '1px' }} />
                    
                    {/* User Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex' }}>
                        <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', minWidth: '120px' }}>Email:</span>
                        <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', marginLeft: '10px', wordBreak: 'break-word' }}>{user.email}</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', minWidth: '120px' }}>Blood Type:</span>
                        <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', marginLeft: '10px' }}>{user.bloodType || 'N/A'}</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', minWidth: '120px' }}>Phone:</span>
                        <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', marginLeft: '10px' }}>{user.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="stats-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px'
                  }}>
                    {stats.map((stat, index) => (
                      <div key={index} className="stat-card" style={{
                        background: 'rgba(255, 215, 0, 0.1)',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        borderRadius: '15px',
                        padding: '20px',
                        textAlign: 'center'
                      }}>
                        <FontAwesomeIcon 
                          icon={stat.icon} 
                          style={{ 
                            fontSize: '2rem', 
                            color: '#FFD700', 
                            marginBottom: '10px' 
                          }} 
                        />
                        <h3 style={{ 
                          fontSize: '1.8rem', 
                          color: '#FFD700', 
                          margin: '0 0 5px 0',
                          fontWeight: 'bold'
                        }}>
                          {stat.value}
                        </h3>
                        <p style={{ 
                          color: '#87CEEB', 
                          fontSize: '0.9rem',
                          margin: 0
                        }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Line */}
                <div style={{ width: '2px', background: '#C0C0C0', height: '100%', minHeight: '500px' }}></div>

                {/* Right Side - QR Code & Actions */}
                <div>
                  {/* QR Code Section */}
                  <div className="qr-container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#000',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,215,0,0.2)',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{ color: '#87CEEB', marginBottom: '25px', fontSize: '1.3rem', fontWeight: 'bold' }}>
                      Your QR Code
                    </h3>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
                      padding: '20px',
                      borderRadius: '15px',
                      boxShadow: '0 10px 25px rgba(255, 215, 0, 0.2)',
                      border: '2px solid rgba(255, 215, 0, 0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        animation: 'shimmer 2s infinite'
                      }}></div>
                      <QRCodeSVG 
                        value={qrData}
                        size={140}
                        level="H"
                        includeMargin={false}
                        style={{ position: 'relative', zIndex: 1 }}
                      />
                    </div>
                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '0.85rem', 
                      color: '#87CEEB', 
                      textAlign: 'center',
                      opacity: 0.8
                    }}>
                      ✨ Scan for verification
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="actions-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px'
                  }}>
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="action-button"
                        onClick={() => navigate(action.path)}
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '15px',
                          color: '#2d3748',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                        }}
                      >
                        <FontAwesomeIcon icon={action.icon} style={{ fontSize: '1.2rem' }} />
                        <span style={{ textAlign: 'center', fontSize: '0.8rem' }}>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;