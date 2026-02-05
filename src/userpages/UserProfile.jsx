import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import config from '../config/config'
import './UserProfile.css'

const UserProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})
  const [saving, setSaving] = useState(false)

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (!token || !user) {
        navigate('/login')
        return
      }

      const response = await fetch(`${config.API_BASE_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setProfile(data.user)
          setEditedProfile(data.user)
          generateQRCode(data.user)
        } else {
          const userData = JSON.parse(user)
          setProfile(userData)
          setEditedProfile(userData)
          generateQRCode(userData)
        }
      } else {
        const userData = JSON.parse(user)
        setProfile(userData)
        setEditedProfile(userData)
        generateQRCode(userData)
      }
    } catch (err) {
      console.error('Profile fetch error:', err)
      const user = localStorage.getItem('user')
      if (user) {
        const userData = JSON.parse(user)
        setProfile(userData)
        setEditedProfile(userData)
        generateQRCode(userData)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile({ ...profile })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile({ ...profile })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Update localStorage
      const updatedUser = { ...profile, ...editedProfile }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Update state
      setProfile(updatedUser)
      setIsEditing(false)
      generateQRCode(updatedUser)
      
      // Dispatch custom event to update dashboard
      window.dispatchEvent(new Event('profileUpdated'))
      
      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 3000
      })
      
      // Try to update on server if available
      const token = localStorage.getItem('token')
      if (token) {
        try {
          await fetch(`${config.API_BASE_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedProfile)
          })
        } catch (serverError) {
          console.log('Server update failed, but local update successful')
        }
      }
    } catch (error) {
      toast.error('Failed to update profile', {
        position: "top-right",
        autoClose: 3000
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateQRCode = (userData) => {
    const qrData = {
      id: userData.id,
      name: userData.full_name || userData.fullName || userData.name,
      email: userData.email,
      bloodType: userData.blood_type || userData.bloodType,
      phone: userData.phone,
      aadhar: userData.aadhar,
      type: 'donor',
      timestamp: Date.now()
    }
    const qrString = JSON.stringify(qrData)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140&data=${encodeURIComponent(qrString)}&color=000000&bgcolor=ffffff`
    setQrCodeUrl(qrUrl)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <div>Failed to load profile</div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-content">
        <div className="profile-background">
          <div className="bg-element bg-element-1"></div>
          <div className="bg-element bg-element-2"></div>
          <div className="bg-element bg-element-3"></div>
          
          <div className="profile-card">
            <div className="profile-inner">
              <div className="profile-section">
                <div className="corner-pin corner-pin-tl"></div>
                <div className="corner-pin corner-pin-tr"></div>
                <div className="corner-pin corner-pin-bl"></div>
                <div className="corner-pin corner-pin-br"></div>
                
                <div className="details-qr-grid">
                  <div className="details-section">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        {(profile.full_name || profile.fullName || profile.name)?.charAt(0).toUpperCase()}
                      </div>
                      <div className="profile-info">
                        <h2 className="profile-title">{profile.full_name || profile.fullName || profile.name}</h2>
                        <p className="profile-subtitle">Blood Donor</p>
                      </div>
                    </div>
                    
                    <hr className="profile-divider" />
                    
                    <div className="profile-field">
                      <span className="field-label">Event:</span>
                      <span className="field-value">Blood Donation Camp</span>
                    </div>
                    
                    <div className="profile-field">
                      <span className="field-label">Email:</span>
                      <span className="field-value">{profile.email}</span>
                    </div>
                    
                    <div className="profile-field">
                      <span className="field-label">Blood Type:</span>
                      <span className="field-value">{profile.blood_type || profile.bloodType}</span>
                    </div>
                    
                    {profile.aadhar && (
                      <div className="profile-field">
                        <span className="field-label">Aadhar:</span>
                        <span className="field-value">{profile.aadhar}</span>
                      </div>
                    )}
                    
                    {profile.phone && (
                      <div className="profile-field">
                        <span className="field-label">Phone:</span>
                        <span className="field-value">{profile.phone}</span>
                      </div>
                    )}
                    
                    {profile.address && (
                      <div className="profile-field">
                        <span className="field-label">Address:</span>
                        <span className="field-value">{profile.address}</span>
                      </div>
                    )}
                    
                    {profile.created_at && (
                      <div className="profile-field">
                        <span className="field-label">Member Since:</span>
                        <span className="field-value">{new Date(profile.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="vertical-line"></div>
                  
                  <div className="qr-section">
                    <h3 className="qr-title">QR Code</h3>
                    <div className="qr-wrapper">
                      {qrCodeUrl && (
                        <img src={qrCodeUrl} alt="Profile QR Code" className="qr-code" />
                      )}
                    </div>
                    <p className="qr-subtitle">✨ Scan for verification</p>
                    
                    <div className="logo-section">
                      <div className="logo-placeholder">
                        🩸 Blood Camp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile