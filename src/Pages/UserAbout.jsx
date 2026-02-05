import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faEye } from '@fortawesome/free-solid-svg-icons';

const UserAbout = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #141223 0%, #1a1635 100%)',
      color: '#fff',
      padding: '30px 20px',
      marginLeft: '280px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#FFD700', 
            margin: '0 0 10px 0',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
          }}>
            About Us
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            opacity: 0.8, 
            margin: 0,
            color: '#ccc'
          }}>
            Learn more about our blood donation camp and mission
          </p>
        </div>

        {/* Founder Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '40px',
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '30px',
          alignItems: 'center'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
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
              color: '#fff', 
              fontSize: '1.4rem',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              Dr. Sarah Johnson
            </h3>
            <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', opacity: 0.9 }}>
              Dr. Sarah Johnson founded the Blood Donation Camp in 2018 with a vision to bridge the gap 
              between blood donors and those in critical need. With over 15 years of experience in 
              hematology and transfusion medicine, she witnessed firsthand the life-saving impact of 
              timely blood donations.
            </p>
            <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', opacity: 0.9 }}>
              Her dedication stems from a personal experience when her younger brother required multiple 
              blood transfusions during his battle with leukemia. This experience ignited her passion 
              for creating a more efficient and accessible blood donation system.
            </p>
            <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', marginBottom: '0', opacity: 0.9 }}>
              Under her leadership, our organization has facilitated over 10,000 successful blood 
              donations and saved countless lives across the community.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '15px',
          padding: '30px'
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              borderRadius: '12px',
              padding: '25px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
                To create a seamless connection between voluntary blood donors and patients in need, 
                ensuring no life is lost due to blood shortage.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              borderRadius: '12px',
              padding: '25px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
                Compassion, integrity, and community service drive everything we do. We believe in 
                the power of human kindness and the gift of life through blood donation.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              borderRadius: '12px',
              padding: '25px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
                To build a world where blood shortage is never a barrier to saving lives, creating 
                a sustainable network of dedicated donors and efficient distribution systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAbout;