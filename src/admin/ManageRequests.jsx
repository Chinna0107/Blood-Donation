import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faArrowLeft, faCheck, faTimes, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';
import config from '../config/config';

const ManageRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('');

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${config.API_BASE_URL}/api/admin/requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setRequests(data.requests);
      } else {
        console.error('Failed to fetch requests:', data.error);
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${config.API_BASE_URL}/api/admin/requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      
      if (data.success) {
        setRequests(prev => prev.map(req => 
          req.id === id ? { ...req, status } : req
        ));
      } else {
        alert('Failed to update status: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleApprove = (id) => {
    updateRequestStatus(id, 'Fulfilled');
  };

  const handleReject = (id) => {
    updateRequestStatus(id, 'Cancelled');
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesStatus = !filterStatus || request.status === filterStatus;
    const matchesUrgency = !filterUrgency || request.urgency === filterUrgency;
    return matchesStatus && matchesUrgency;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#f59e0b';
      case 'Fulfilled': return '#22c55e';
      case 'Cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return '#dc2626';
      case 'High': return '#f97316';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading requests...</p>
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
          .request-row { animation: fadeInUp 0.6s ease-out; transition: all 0.3s ease; }
          .request-row:hover { background: rgba(255, 215, 0, 0.1) !important; }
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
                Manage Requests
              </h1>
              <p style={{ color: '#87CEEB', margin: 0, opacity: 0.8 }}>Total: {requests.length} requests</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 200px', gap: '20px', marginBottom: '30px' }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,215,0,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: '#FFD700',
              fontSize: '1rem'
            }}
          >
            <option value="">All Status</option>
            <option value="Active" style={{ background: '#000' }}>Active</option>
            <option value="Fulfilled" style={{ background: '#000' }}>Fulfilled</option>
            <option value="Cancelled" style={{ background: '#000' }}>Cancelled</option>
          </select>
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,215,0,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: '#FFD700',
              fontSize: '1rem'
            }}
          >
            <option value="">All Urgency</option>
            <option value="Critical" style={{ background: '#000' }}>Critical</option>
            <option value="High" style={{ background: '#000' }}>High</option>
            <option value="Medium" style={{ background: '#000' }}>Medium</option>
            <option value="Low" style={{ background: '#000' }}>Low</option>
          </select>
        </div>

        {/* Requests Table */}
        <div style={{ background: '#000', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr 1fr 1fr 1.5fr', gap: '15px', padding: '20px', background: 'rgba(255,215,0,0.1)', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Patient</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Blood Type</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Units</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Urgency</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Hospital</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Status</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Date</div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Actions</div>
          </div>
          
          {filteredRequests.map((request, index) => (
            <div key={request.id} className="request-row" style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr 1fr 1fr 1.5fr',
              gap: '15px',
              padding: '20px',
              borderBottom: index < filteredRequests.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}>
              <div style={{ color: '#87CEEB', fontWeight: '600' }}>{request.patientName}</div>
              <div style={{
                color: '#fff',
                background: request.bloodType.includes('+') ? '#dc2626' : '#7c3aed',
                padding: '4px 8px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {request.bloodType}
              </div>
              <div style={{ color: '#87CEEB', textAlign: 'center' }}>{request.units}</div>
              <div style={{
                color: '#fff',
                background: getUrgencyColor(request.urgency),
                padding: '4px 8px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {request.urgency}
              </div>
              <div style={{ color: '#87CEEB' }}>{request.hospital}</div>
              <div style={{
                color: '#fff',
                background: getStatusColor(request.status),
                padding: '4px 8px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {request.status}
              </div>
              <div style={{ color: '#87CEEB' }}>{request.requestDate}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: '#3b82f6', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#fff', cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {request.status === 'Active' && (
                  <>
                    <button 
                      onClick={() => handleApprove(request.id)}
                      style={{ background: '#22c55e', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#fff', cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button 
                      onClick={() => handleReject(request.id)}
                      style={{ background: '#ef4444', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#fff', cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#87CEEB' }}>
            <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.5 }} />
            <h3>No requests found</h3>
            <p>Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;