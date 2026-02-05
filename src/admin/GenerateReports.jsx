import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faArrowLeft, faDownload, faCalendarAlt, faUsers, faDroplet, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import config from '../config/config';

const GenerateReports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { id: 'donors', name: 'Donor Statistics', icon: faUsers, description: 'Comprehensive donor registration and activity report' },
    { id: 'requests', name: 'Request Analytics', icon: faClipboardList, description: 'Blood request patterns and fulfillment rates' },
    { id: 'inventory', name: 'Blood Inventory', icon: faChartLine, description: 'Current blood stock levels and usage' }
  ];

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${config.API_BASE_URL}/api/admin/reports/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }
    
    setGenerating(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${config.API_BASE_URL}/api/admin/reports/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reportType: selectedReport,
          startDate: dateRange.start,
          endDate: dateRange.end
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setReportData(data);
        alert(`${reportTypes.find(r => r.id === selectedReport)?.name} report generated successfully!`);
      } else {
        alert('Failed to generate report: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Network error. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadReport = () => {
    if (!reportData) return;
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportData.reportType}_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const quickStats = [
    { label: 'Total Donors', value: stats.totalDonors || '0', color: '#3b82f6' },
    { label: 'Total Requests', value: stats.totalRequests || '0', color: '#22c55e' },
    { label: 'Active Requests', value: stats.activeRequests || '0', color: '#f59e0b' },
    { label: 'This Month', value: stats.thisMonthRequests || '0', color: '#7c3aed' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', padding: '40px' }}>
      <style>
        {`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          .report-card { animation: fadeInUp 0.6s ease-out; transition: all 0.3s ease; cursor: pointer; }
          .report-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2); }
          .stat-card { animation: fadeInUp 0.8s ease-out; transition: all 0.3s ease; }
          .stat-card:hover { transform: translateY(-3px); }
        `}
      </style>
      
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
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
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
                Generate Reports
              </h1>
              <p style={{ color: '#87CEEB', margin: 0, opacity: 0.8 }}>Analytics and reporting dashboard</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {quickStats.map((stat, index) => (
            <div key={index} className="stat-card" style={{
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center'
            }}>
              {loading ? (
                <>
                  <div style={{ width: '60px', height: '60px', border: '4px solid rgba(255, 215, 0, 0.3)', borderTop: '4px solid #FFD700', borderRadius: '50%', animation: 'pulse 1s infinite', margin: '0 auto 10px' }}></div>
                  <p style={{ color: '#87CEEB', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>Loading...</p>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '2rem', color: stat.color, margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    {stat.value}
                  </h3>
                  <p style={{ color: '#87CEEB', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
                    {stat.label}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Report Selection */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#FFD700', fontSize: '1.5rem', marginBottom: '20px' }}>Select Report Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="report-card"
                onClick={() => setSelectedReport(report.id)}
                style={{
                  background: selectedReport === report.id ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: selectedReport === report.id ? '2px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '25px',
                  textAlign: 'center'
                }}
              >
                <FontAwesomeIcon 
                  icon={report.icon} 
                  style={{ 
                    fontSize: '2.5rem', 
                    color: selectedReport === report.id ? '#FFD700' : '#87CEEB', 
                    marginBottom: '15px' 
                  }} 
                />
                <h3 style={{ 
                  color: selectedReport === report.id ? '#FFD700' : '#87CEEB', 
                  fontSize: '1.2rem', 
                  margin: '0 0 10px 0',
                  fontWeight: 'bold'
                }}>
                  {report.name}
                </h3>
                <p style={{ 
                  color: '#87CEEB', 
                  fontSize: '0.9rem', 
                  margin: 0,
                  opacity: 0.8
                }}>
                  {report.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#FFD700', fontSize: '1.5rem', marginBottom: '20px' }}>Date Range (Optional)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '500px' }}>
            <div>
              <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block' }}>Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
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
            <div>
              <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block' }}>End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
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
          </div>
        </div>

        {/* Generate Button */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            style={{
              background: generating ? '#6b7280' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '15px 40px',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: generating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
              opacity: generating ? 0.7 : 1
            }}
          >
            <FontAwesomeIcon icon={generating ? faCalendarAlt : faDownload} style={{ animation: generating ? 'pulse 1s infinite' : 'none' }} />
            {generating ? 'Generating Report...' : 'Generate Report'}
          </button>
        </div>

        {/* Report Results */}
        {reportData && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#FFD700', fontSize: '1.5rem', margin: 0 }}>Report Results</h2>
              <button
                onClick={downloadReport}
                style={{
                  background: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FontAwesomeIcon icon={faDownload} />
                Download JSON
              </button>
            </div>
            <div style={{ background: '#000', borderRadius: '15px', padding: '20px', border: '1px solid rgba(255,215,0,0.2)' }}>
              <pre style={{ color: '#87CEEB', fontSize: '0.9rem', overflow: 'auto', maxHeight: '400px' }}>
                {JSON.stringify(reportData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateReports;