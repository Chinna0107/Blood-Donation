import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faCalendarAlt, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import config from '../config/config';

const PreviousDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchDonations = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }
      
      const userObj = JSON.parse(userData);
      setUser(userObj);
      
      const response = await fetch(`${config.API_BASE_URL}/api/donations/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userObj.email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setDonations(data.donations);
      } else {
        setDonations([]);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading donations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ marginLeft: '280px', flex: 1 }}>
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
            .donation-card {
              animation: fadeInUp 0.6s ease-out;
              transition: all 0.3s ease;
            }
            .donation-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
            }
            @media (max-width: 768px) {
              .donations-content { margin-left: 0 !important; padding-top: 80px !important; }
            }
          `}
        </style>
        
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)',
          padding: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(30px)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(255,215,0,0.15)',
            border: '2px solid rgba(255,215,0,0.2)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: '#FFD700', 
                margin: '0 0 10px 0',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
              }}>
                Previous Donations
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                opacity: 0.8, 
                margin: 0,
                color: '#87CEEB'
              }}>
                Your blood donation history and impact
              </p>
            </div>

            {donations.length === 0 ? (
              <div style={{
                background: '#000',
                padding: '40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,215,0,0.2)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon 
                  icon={faDroplet} 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#FFD700', 
                    marginBottom: '20px',
                    opacity: 0.5
                  }} 
                />
                <h3 style={{ color: '#87CEEB', marginBottom: '10px' }}>No Donations Yet</h3>
                <p style={{ color: '#87CEEB', opacity: 0.8 }}>
                  Start your journey as a blood donor and help save lives!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {donations.map((donation) => (
                  <div key={donation.id} className="donation-card" style={{
                    background: '#000',
                    padding: '25px',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,215,0,0.2)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '20px',
                    alignItems: 'center'
                  }}>
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
                        <FontAwesomeIcon icon={faDroplet} style={{ fontSize: '1.5rem', color: '#2d3748' }} />
                      </div>
                      <div>
                        <h3 style={{ color: '#FFD700', margin: '0', fontSize: '1.2rem' }}>
                          {donation.bloodType}
                        </h3>
                        <p style={{ color: '#87CEEB', margin: '0', fontSize: '0.9rem' }}>
                          {donation.units} Unit
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                        <span style={{ color: '#87CEEB', fontSize: '1rem' }}>
                          {new Date(donation.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                        <span style={{ color: '#87CEEB', fontSize: '1rem' }}>{donation.location}</span>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.5)',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#22c55e', fontSize: '0.9rem' }} />
                      <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: '600' }}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousDonations;