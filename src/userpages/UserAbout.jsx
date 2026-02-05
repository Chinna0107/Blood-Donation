import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faEye } from '@fortawesome/free-solid-svg-icons';
import Founder from '../admin/HEMANTH.png'
const UserAbout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ marginLeft: '280px', flex: 1 }} className="userabout-content">
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
            .about-card {
              animation: fadeInUp 0.6s ease-out;
              transition: all 0.3s ease;
            }
            .about-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
            }
            .mission-card {
              animation: fadeInUp 0.8s ease-out;
              transition: all 0.3s ease;
            }
            .mission-card:hover {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
            }
            @media (max-width: 768px) {
              .userabout-content { margin-left: 0 !important; padding-top: 80px !important; }
              .founder-grid { grid-template-columns: 1fr !important; text-align: center !important; }
              .mission-grid { grid-template-columns: 1fr !important; }
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
          
          {/* Main About Card */}
          <div className="about-card" style={{
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
                  About Us
                </h1>
                <p style={{ 
                  fontSize: '1.1rem', 
                  opacity: 0.8, 
                  margin: 0,
                  color: '#87CEEB'
                }}>
                  Learn more about our blood donation camp and mission
                </p>
              </div>

              {/* Founder Section */}
              <div className="founder-grid" style={{
                background: '#000',
                backdropFilter: 'blur(20px)',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                marginBottom: '40px',
                border: '1px solid rgba(255,215,0,0.2)',
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                gap: '30px',
                alignItems: 'center'
              }}>
                {/* Corner Pins */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={Founder}
                    alt="Founder"
                    style={{
                      width: '250px',
                      height: '250px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #FFD700',
                      boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
                    }}
                  />
                </div>
                <div>
                  <h2 style={{ 
                    color: '#FFD700', 
                    fontSize: '1.8rem',
                    marginBottom: '10px',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                  }}>
                    About Our Founder
                  </h2>
                  <h3 style={{ 
                    color: '#87CEEB', 
                    fontSize: '1.4rem',
                    marginBottom: '20px',
                    fontWeight: '600'
                  }}>
                    Dr. Sarah Johnson
                  </h3>
                  <p style={{ color: '#87CEEB', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', opacity: 0.9 }}>
                    Dr. Sarah Johnson founded the Blood Donation Camp in 2018 with a vision to bridge the gap 
                    between blood donors and those in critical need. With over 15 years of experience in 
                    hematology and transfusion medicine, she witnessed firsthand the life-saving impact of 
                    timely blood donations.
                  </p>
                  <p style={{ color: '#87CEEB', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', opacity: 0.9 }}>
                    Her dedication stems from a personal experience when her younger brother required multiple 
                    blood transfusions during his battle with leukemia. This experience ignited her passion 
                    for creating a more efficient and accessible blood donation system.
                  </p>
                  <p style={{ color: '#87CEEB', fontSize: '1rem', lineHeight: '1.6', marginBottom: '0', opacity: 0.9 }}>
                    Under her leadership, our organization has facilitated over 10,000 successful blood 
                    donations and saved countless lives across the community.
                  </p>
                </div>
              </div>

              {/* Mission Section */}
              <div style={{
                background: '#000',
                backdropFilter: 'blur(20px)',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,215,0,0.2)',
                position: 'relative'
              }}>
                <h2 style={{ 
                  color: '#FFD700', 
                  fontSize: '1.8rem',
                  marginBottom: '30px',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                }}>
                  Our Mission
                </h2>
                <div className="mission-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '25px'
                }}>
                  <div className="mission-card" style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '15px',
                    padding: '25px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon 
                      icon={faHeart} 
                      style={{ 
                        fontSize: '2.5rem', 
                        color: '#FFD700', 
                        marginBottom: '15px' 
                      }} 
                    />
                    <h3 style={{ 
                      color: '#FFD700', 
                      fontSize: '1.3rem',
                      marginBottom: '15px',
                      fontWeight: '600'
                    }}>
                      Our Purpose
                    </h3>
                    <p style={{ color: '#87CEEB', fontSize: '1rem', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
                      To create a seamless connection between voluntary blood donors and patients in need, 
                      ensuring no life is lost due to blood shortage.
                    </p>
                  </div>

                  <div className="mission-card" style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '15px',
                    padding: '25px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon 
                      icon={faUsers} 
                      style={{ 
                        fontSize: '2.5rem', 
                        color: '#FFD700', 
                        marginBottom: '15px' 
                      }} 
                    />
                    <h3 style={{ 
                      color: '#FFD700', 
                      fontSize: '1.3rem',
                      marginBottom: '15px',
                      fontWeight: '600'
                    }}>
                      Our Values
                    </h3>
                    <p style={{ color: '#87CEEB', fontSize: '1rem', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
                      Compassion, integrity, and community service drive everything we do. We believe in 
                      the power of human kindness and the gift of life through blood donation.
                    </p>
                  </div>

                  <div className="mission-card" style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '15px',
                    padding: '25px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon 
                      icon={faEye} 
                      style={{ 
                        fontSize: '2.5rem', 
                        color: '#FFD700', 
                        marginBottom: '15px' 
                      }} 
                    />
                    <h3 style={{ 
                      color: '#FFD700', 
                      fontSize: '1.3rem',
                      marginBottom: '15px',
                      fontWeight: '600'
                    }}>
                      Our Vision
                    </h3>
                    <p style={{ color: '#87CEEB', fontSize: '1rem', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
                      To build a world where blood shortage is never a barrier to saving lives, creating 
                      a sustainable network of dedicated donors and efficient distribution systems.
                    </p>
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

export default UserAbout;