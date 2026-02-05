import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faCalendarAlt, faMapMarkerAlt, faCheckCircle, faHourglass } from '@fortawesome/free-solid-svg-icons';

const PreviousAccepted = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }
      
      const userObj = JSON.parse(userData);
      
      const response = await fetch('http://localhost:5000/api/donations/requests-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userObj.email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRequests(data.requests);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ marginLeft: '280px', flex: 1 }} className="requests-content">
        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.1); }
              50% { box-shadow: 0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .request-card {
              animation: fadeInUp 0.6s ease-out;
              transition: all 0.3s ease;
            }
            .request-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
            }
            @media (max-width: 768px) {
              .requests-content { margin-left: 0 !important; padding-top: 80px !important; }
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
          
          {/* Main Content */}
          <div style={{
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
                  Previous Blood Requests
                </h1>
                <p style={{ 
                  fontSize: '1.1rem', 
                  opacity: 0.8, 
                  margin: 0,
                  color: '#87CEEB'
                }}>
                  Your blood request history and status
                </p>
              </div>

              {/* Requests List */}
              {requests.length === 0 ? (
                <div style={{
                  background: '#000',
                  padding: '40px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,215,0,0.2)',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon 
                    icon={faHandHoldingHeart} 
                    style={{ 
                      fontSize: '3rem', 
                      color: '#FFD700', 
                      marginBottom: '20px',
                      opacity: 0.5
                    }} 
                  />
                  <h3 style={{ color: '#87CEEB', marginBottom: '10px' }}>No Requests Yet</h3>
                  <p style={{ color: '#87CEEB', opacity: 0.8 }}>
                    When you need blood, your requests will appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {requests.map((request, index) => (
                    <div key={request.id} className="request-card" style={{
                      background: '#000',
                      backdropFilter: 'blur(20px)',
                      padding: '25px',
                      borderRadius: '15px',
                      border: '1px solid rgba(255,215,0,0.2)',
                      position: 'relative'
                    }}>
                      {/* Corner Pins */}
                      <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'center' }}>
                        {/* Left - Icon and Blood Type */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <FontAwesomeIcon icon={faHandHoldingHeart} style={{ fontSize: '1.5rem', color: '#2d3748' }} />
                          </div>
                          <div>
                            <h3 style={{ color: '#FFD700', margin: '0', fontSize: '1.2rem' }}>
                              {request.bloodType}
                            </h3>
                            <p style={{ color: '#87CEEB', margin: '0', fontSize: '0.9rem' }}>
                              {request.units} Unit{request.units > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        {/* Center - Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                            <span style={{ color: '#87CEEB', fontSize: '1rem' }}>
                              {new Date(request.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                            <span style={{ color: '#87CEEB', fontSize: '1rem' }}>{request.hospital}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#87CEEB', fontSize: '0.9rem' }}>Patient:</span>
                            <span style={{ color: '#FFD700', fontSize: '1rem', fontWeight: '600' }}>{request.patientName}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#87CEEB', fontSize: '0.9rem' }}>Urgency:</span>
                            <span style={{ 
                              color: request.urgency === 'Critical' ? '#ef4444' : request.urgency === 'High' ? '#f97316' : '#22c55e', 
                              fontSize: '1rem', 
                              fontWeight: '600' 
                            }}>
                              {request.urgency}
                            </span>
                          </div>
                        </div>

                        {/* Right - Status */}
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            background: request.status === 'Fulfilled' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                            border: request.status === 'Fulfilled' ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(234, 179, 8, 0.5)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <FontAwesomeIcon 
                              icon={request.status === 'Fulfilled' ? faCheckCircle : faHourglass} 
                              style={{ 
                                color: request.status === 'Fulfilled' ? '#22c55e' : '#eab308', 
                                fontSize: '0.9rem' 
                              }} 
                            />
                            <span style={{ 
                              color: request.status === 'Fulfilled' ? '#22c55e' : '#eab308', 
                              fontSize: '0.9rem', 
                              fontWeight: '600' 
                            }}>
                              {request.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Stats */}
              {requests.length > 0 && (
                <div style={{
                  background: '#000',
                  padding: '30px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,215,0,0.2)',
                  marginTop: '30px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '1.5rem' }}>
                    Request Summary
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <h4 style={{ color: '#FFD700', fontSize: '2rem', margin: '0' }}>{requests.length}</h4>
                      <p style={{ color: '#87CEEB', margin: '0' }}>Total Requests</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#FFD700', fontSize: '2rem', margin: '0' }}>{requests.reduce((sum, r) => sum + r.units, 0)}</h4>
                      <p style={{ color: '#87CEEB', margin: '0' }}>Units Requested</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#22c55e', fontSize: '2rem', margin: '0' }}>{requests.filter(r => r.status === 'Fulfilled').length}</h4>
                      <p style={{ color: '#87CEEB', margin: '0' }}>Fulfilled Requests</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousAccepted;