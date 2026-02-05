import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faDroplet, faClipboardList, faChartLine, faBell, faUserShield, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import './AdminDashboard.css'

function AdminDashboard() {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedDonations: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('user')
    
    if (adminToken && userData) {
      const user = JSON.parse(userData)
      setAdmin(user)
      // Load admin stats here
      setStats({
        totalDonors: 150,
        totalRequests: 45,
        pendingRequests: 12,
        completedDonations: 230
      })
    } else {
      navigate('/login')
    }
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('adminToken')
    navigate('/')
    window.location.reload()
  }

  const quickActions = [
    { icon: faUsers, label: 'Manage Donors', path: '/admin/donors', color: '#dc2626' },
    { icon: faClipboardList, label: 'Manage Requests', path: '/admin/requests', color: '#059669' },
    { icon: faChartLine, label: 'Generate Reports', path: '/admin/reports', color: '#7c3aed' },
    { icon: faCog, label: 'Settings', path: '/admin/settings', color: '#ea580c' }
  ]

  const adminStats = [
    { label: 'Total Donors', value: stats.totalDonors, icon: faUsers, color: '#dc2626' },
    { label: 'Blood Requests', value: stats.totalRequests, icon: faDroplet, color: '#059669' },
    { label: 'Pending Requests', value: stats.pendingRequests, icon: faBell, color: '#f97316' },
    { label: 'Completed Donations', value: stats.completedDonations, icon: faChartLine, color: '#22c55e' }
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 215, 0, 0.3)', borderTop: '6px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
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
          .admin-card {
            animation: fadeInUp 0.6s ease-out;
            transition: all 0.3s ease;
          }
          .admin-card:hover {
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
        `}
      </style>
      
      <div style={{ flex: 1 }}>
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
          
          {/* Main Admin Dashboard Card */}
          <div className="admin-card" style={{
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div style={{ textAlign: 'left' }}>
                  <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    color: '#FFD700', 
                    margin: '0 0 10px 0',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                  }}>
                    Admin Dashboard
                  </h1>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    opacity: 0.8, 
                    margin: 0,
                    color: '#87CEEB'
                  }}>
                    Welcome back, {admin.full_name || admin.fullName || admin.name || 'Admin'}!
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </div>

              {/* Admin Profile Section */}
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
                    <FontAwesomeIcon icon={faUserShield} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', margin: '0', color: '#87CEEB', fontWeight: 'bold' }}>
                      {admin.full_name || admin.fullName || admin.name || 'Administrator'}
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#87CEEB', margin: '0', fontWeight: '500' }}>
                      System Administrator
                    </p>
                  </div>
                </div>
                
                <hr style={{ border: 'none', height: '2px', background: 'linear-gradient(90deg, #87CEEB, transparent)', margin: '20px 0', borderRadius: '1px' }} />
                
                {/* Admin Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex' }}>
                    <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', minWidth: '120px' }}>Email:</span>
                    <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', marginLeft: '10px', wordBreak: 'break-word' }}>{admin.email}</span>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', minWidth: '120px' }}>Role:</span>
                    <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', marginLeft: '10px' }}>Administrator</span>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', minWidth: '120px' }}>Access Level:</span>
                    <span style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', marginLeft: '10px' }}>Full Access</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {adminStats.map((stat, index) => (
                  <div key={index} className="stat-card" style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '15px',
                    padding: '25px',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon 
                      icon={stat.icon} 
                      style={{ 
                        fontSize: '2.5rem', 
                        color: stat.color, 
                        marginBottom: '15px' 
                      }} 
                    />
                    <h3 style={{ 
                      fontSize: '2.2rem', 
                      color: '#FFD700', 
                      margin: '0 0 8px 0',
                      fontWeight: 'bold'
                    }}>
                      {stat.value}
                    </h3>
                    <p style={{ 
                      color: '#87CEEB', 
                      fontSize: '1rem',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                      padding: '20px',
                      color: '#2d3748',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    <FontAwesomeIcon icon={action.icon} style={{ fontSize: '1.5rem' }} />
                    <span style={{ textAlign: 'center' }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard