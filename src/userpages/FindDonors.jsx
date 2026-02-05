import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDroplet, faPhone, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import config from '../config/config';

const FindDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    bloodType: '',
    location: ''
  });
  const navigate = useNavigate();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const searchDonors = async () => {
    if (!searchCriteria.bloodType) {
      alert('Please select a blood type');
      return;
    }

    setLoading(true);
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${config.BASE_URL}/api/donors/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bloodType: searchCriteria.bloodType,
          ...(searchCriteria.location && { location: searchCriteria.location })
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setDonors(data.donors);
      } else {
        setDonors([]);
      }
    } catch (error) {
      console.error('Error searching donors:', error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Searching donors...</p>
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
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .donor-card {
              animation: fadeInUp 0.6s ease-out;
              transition: all 0.3s ease;
            }
            .donor-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
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
                Find Blood Donors
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                opacity: 0.8, 
                margin: 0,
                color: '#87CEEB'
              }}>
                Search for available blood donors in your area
              </p>
            </div>

            {/* Search Form */}
            <div style={{
              background: '#000',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255,215,0,0.2)',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '20px', alignItems: 'end' }}>
                <div>
                  <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block' }}>
                    Blood Type *
                  </label>
                  <select
                    value={searchCriteria.bloodType}
                    onChange={(e) => setSearchCriteria({...searchCriteria, bloodType: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,215,0,0.3)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#FFD700',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Select Blood Type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type} style={{ background: '#000' }}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block' }}>
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.location}
                    onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
                    placeholder="Enter city or area"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,215,0,0.3)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#FFD700',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <button
                  onClick={searchDonors}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                  Search
                </button>
              </div>
            </div>

            {/* Results */}
            {donors.length === 0 ? (
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
                <h3 style={{ color: '#87CEEB', marginBottom: '10px' }}>No Donors Found</h3>
                <p style={{ color: '#87CEEB', opacity: 0.8 }}>
                  Try searching with different criteria or check back later.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {donors.map((donor, index) => (
                  <div key={index} className="donor-card" style={{
                    background: '#000',
                    padding: '25px',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,215,0,0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FontAwesomeIcon icon={faDroplet} style={{ fontSize: '1.8rem', color: '#2d3748' }} />
                      </div>
                      <div>
                        <h3 style={{ color: '#FFD700', margin: '0', fontSize: '1.5rem' }}>
                          {donor.blood_type}
                        </h3>
                        <p style={{ color: '#87CEEB', margin: '0', fontSize: '0.9rem' }}>
                          Blood Type
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                        <span style={{ color: '#87CEEB', fontSize: '1rem' }}>{donor.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FontAwesomeIcon icon={faPhone} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                        <span style={{ color: '#87CEEB', fontSize: '1rem' }}>{donor.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#87CEEB', fontSize: '0.9rem' }} />
                        <span style={{ color: '#87CEEB', fontSize: '1rem' }}>{donor.address}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(`tel:${donor.phone}`)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        marginTop: '20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: '#fff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Contact Donor
                    </button>
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

export default FindDonors;