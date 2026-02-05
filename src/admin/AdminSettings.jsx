import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faArrowLeft, faSave, faUser, faBell, faShield, faDatabase, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Blood Camp',
      adminEmail: 'admin@bloodcamp.com',
      timezone: 'UTC',
      language: 'English'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      weeklyReports: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5'
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      backupFrequency: 'daily',
      logLevel: 'info'
    }
  });
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', name: 'General', icon: faCog },
    { id: 'notifications', name: 'Notifications', icon: faBell },
    { id: 'security', name: 'Security', icon: faShield },
    { id: 'system', name: 'System', icon: faDatabase }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div style={{ display: 'grid', gap: '25px' }}>
      <div>
        <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
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
        <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Admin Email</label>
        <input
          type="email"
          value={settings.general.adminEmail}
          onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
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
            <option value="UTC" style={{ background: '#000' }}>UTC</option>
            <option value="EST" style={{ background: '#000' }}>EST</option>
            <option value="PST" style={{ background: '#000' }}>PST</option>
          </select>
        </div>
        <div>
          <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
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
            <option value="English" style={{ background: '#000' }}>English</option>
            <option value="Spanish" style={{ background: '#000' }}>Spanish</option>
            <option value="French" style={{ background: '#000' }}>French</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: 'grid', gap: '25px' }}>
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
          <div>
            <h4 style={{ color: '#87CEEB', margin: '0 0 5px 0', textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p style={{ color: '#87CEEB', opacity: 0.7, margin: 0, fontSize: '0.9rem' }}>
              {key === 'emailNotifications' && 'Receive email notifications for important events'}
              {key === 'smsNotifications' && 'Get SMS alerts for critical updates'}
              {key === 'pushNotifications' && 'Browser push notifications'}
              {key === 'weeklyReports' && 'Weekly summary reports via email'}
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => updateSetting('notifications', key, e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: value ? '#22c55e' : '#6b7280',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '26px',
                width: '26px',
                left: value ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%'
              }}></span>
            </span>
          </label>
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'grid', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
        <div>
          <h4 style={{ color: '#87CEEB', margin: '0 0 5px 0' }}>Two-Factor Authentication</h4>
          <p style={{ color: '#87CEEB', opacity: 0.7, margin: 0, fontSize: '0.9rem' }}>Add an extra layer of security to your account</p>
        </div>
        <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: settings.security.twoFactorAuth ? '#22c55e' : '#6b7280',
            transition: '0.4s',
            borderRadius: '34px'
          }}>
            <span style={{
              position: 'absolute',
              content: '',
              height: '26px',
              width: '26px',
              left: settings.security.twoFactorAuth ? '30px' : '4px',
              bottom: '4px',
              backgroundColor: 'white',
              transition: '0.4s',
              borderRadius: '50%'
            }}></span>
          </span>
        </label>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
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
          <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Password Expiry (days)</label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => updateSetting('security', 'passwordExpiry', e.target.value)}
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
  );

  const renderSystemSettings = () => (
    <div style={{ display: 'grid', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
        <div>
          <h4 style={{ color: '#87CEEB', margin: '0 0 5px 0' }}>Maintenance Mode</h4>
          <p style={{ color: '#87CEEB', opacity: 0.7, margin: 0, fontSize: '0.9rem' }}>Put the system in maintenance mode</p>
        </div>
        <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
          <input
            type="checkbox"
            checked={settings.system.maintenanceMode}
            onChange={(e) => updateSetting('system', 'maintenanceMode', e.target.checked)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: settings.system.maintenanceMode ? '#ef4444' : '#6b7280',
            transition: '0.4s',
            borderRadius: '34px'
          }}>
            <span style={{
              position: 'absolute',
              content: '',
              height: '26px',
              width: '26px',
              left: settings.system.maintenanceMode ? '30px' : '4px',
              bottom: '4px',
              backgroundColor: 'white',
              transition: '0.4s',
              borderRadius: '50%'
            }}></span>
          </span>
        </label>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Backup Frequency</label>
          <select
            value={settings.system.backupFrequency}
            onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
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
            <option value="hourly" style={{ background: '#000' }}>Hourly</option>
            <option value="daily" style={{ background: '#000' }}>Daily</option>
            <option value="weekly" style={{ background: '#000' }}>Weekly</option>
          </select>
        </div>
        <div>
          <label style={{ color: '#87CEEB', fontSize: '1rem', marginBottom: '8px', display: 'block', fontWeight: '600' }}>Log Level</label>
          <select
            value={settings.system.logLevel}
            onChange={(e) => updateSetting('system', 'logLevel', e.target.value)}
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
            <option value="error" style={{ background: '#000' }}>Error</option>
            <option value="warn" style={{ background: '#000' }}>Warning</option>
            <option value="info" style={{ background: '#000' }}>Info</option>
            <option value="debug" style={{ background: '#000' }}>Debug</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'system': return renderSystemSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', padding: '40px' }}>
      <style>
        {`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          .tab-button { animation: fadeInUp 0.6s ease-out; transition: all 0.3s ease; }
          .tab-button:hover { transform: translateY(-2px); }
        `}
      </style>
      
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(30px)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(255,215,0,0.15)',
        border: '2px solid rgba(255,215,0,0.2)',
        maxWidth: '1000px',
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
                Admin Settings
              </h1>
              <p style={{ color: '#87CEEB', margin: 0, opacity: 0.8 }}>Configure system preferences</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: saving ? '#6b7280' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 20px',
              color: '#fff',
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              opacity: saving ? 0.7 : 1
            }}
          >
            <FontAwesomeIcon icon={faSave} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab-button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                border: activeTab === tab.id ? '1px solid #FFD700' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '12px 20px',
                color: activeTab === tab.id ? '#FFD700' : '#87CEEB',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '400px' }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;