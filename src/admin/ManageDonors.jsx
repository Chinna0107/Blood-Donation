import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArrowLeft, faSearch, faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import config from '../config/config';

const ManageDonors = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodType, setFilterBloodType] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${config.API_BASE_URL}/api/admin/donors`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setDonors(data.donors);
      } else {
        console.error('Failed to fetch donors:', data.error);
        setDonors([]);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteDonor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${config.API_BASE_URL}/api/admin/donors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setDonors(donors.filter(donor => donor.id !== id));
      } else {
        alert('Failed to delete donor: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting donor:', error);
      alert('Network error. Please try again.');
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = !filterBloodType || donor.bloodType === filterBloodType;
    return matchesSearch && matchesBloodType;
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', padding: '40px' }}>
      <style>
        {`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          .donor-row { animation: fadeInUp 0.6s ease-out; transition: all 0.3s ease; }
          .donor-row:hover { background: rgba(255, 215, 0, 0.1) !important; }
        `}
      </style>
      
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(30px)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(255,215,0,0.15)',
        border: '2px solid rgba(255,215,0,0.2)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => navigate('/admin/dashboard')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '10px 15px',
                color: '#FFD700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </button>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFD700', margin: 0, textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>
                Manage Donors
              </h1>
              <p style={{ color: '#87CEEB', margin: 0, opacity: 0.8 }}>Total: {donors.length} donors</p>
            </div>
          </div>
          <button
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 20px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Donor
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '20px', marginBottom: '30px' }}>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#FFD700' }} />
            <input
              type="text"
              placeholder="Search donors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                borderRadius: '10px',
                border: '1px solid rgba(255,215,0,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFD700',
                fontSize: '1rem'
              }}
            />
          </div>
          <select
            value={filterBloodType}
            onChange={(e) => setFilterBloodType(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,215,0,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: '#FFD700',
              fontSize: '1rem'
            }}
          >
            <option value="">All Blood Types</option>
            {bloodTypes.map(type => (
              <option key={type} value={type} style={{ background: '#000' }}>{type}</option>
            ))}
          </select>
        </div>

        {/* Donors Table */}
        <div style={{ background: '#000', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1.5fr 1fr 1.5fr 1fr', gap: '20px', padding: '20px', background: 'rgba(255,215,0,0.1)', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Name</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Email</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Blood Type</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Phone</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Status</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Last Donation</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Actions</div>
          </div>
          
          {filteredDonors.map((donor, index) => (
            <div key={donor.id} className="donor-row" style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr 1.5fr 1fr 1.5fr 1fr',
              gap: '20px',
              padding: '20px',
              borderBottom: index < filteredDonors.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}>
              <div style={{ color: '#87CEEB', fontWeight: '600' }}>{donor.name}</div>
              <div style={{ color: '#87CEEB' }}>{donor.email}</div>
              <div style={{
                color: '#fff',
                background: donor.bloodType.includes('+') ? '#dc2626' : '#7c3aed',
                padding: '4px 8px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {donor.bloodType}
              </div>
              <div style={{ color: '#87CEEB' }}>{donor.phone}</div>
              <div style={{
                color: donor.status === 'Active' ? '#22c55e' : '#f97316',
                fontWeight: '600'
              }}>
                {donor.status}
              </div>
              <div style={{ color: '#87CEEB' }}>{donor.lastDonation}</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ background: '#3b82f6', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#fff', cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button style={{ background: '#f59e0b', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#fff', cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  onClick={() => deleteDonor(donor.id)}
                  style={{ background: '#ef4444', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#fff', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#87CEEB' }}>
            <FontAwesomeIcon icon={faUsers} style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.5 }} />
            <h3>No donors found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDonors;