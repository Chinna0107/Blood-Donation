import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../config/config'
import './UserQR.css'

function UserQR() {
  const [user, setUser] = useState(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      fetchQRData()
    } else {
      navigate('/login')
    }
  }, [navigate])

  const fetchQRData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${config.API_BASE_URL}/api/auth/qr-code`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          generateQRCode(data.qrData)
        } else {
          generateFallbackQR()
        }
      } else {
        generateFallbackQR()
      }
    } catch (error) {
      console.error('Error fetching QR data:', error)
      generateFallbackQR()
    } finally {
      setLoading(false)
    }
  }

  const generateFallbackQR = () => {
    const qrData = {
      id: user.id,
      name: user.fullName || user.name,
      email: user.email,
      bloodType: user.bloodType,
      phone: user.phone,
      type: 'donor'
    }
    generateQRCode(qrData)
  }

  const generateQRCode = (qrData) => {
    const qrString = JSON.stringify(qrData)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}&color=dc2626&bgcolor=ffffff`
    setQrCodeUrl(qrUrl)
  }

  const downloadQR = () => {
    const link = document.createElement('a')
    link.download = `${user.fullName || user.name}_QR.png`
    link.href = qrCodeUrl
    link.click()
  }

  if (!user || loading) {
    return (
      <main className="qr-page">
        <div className="qr-container">
          <Card className="qr-card">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress sx={{ color: '#dc2626' }} />
              </Box>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="qr-page">
      <div className="qr-container">
        <Card className="qr-card">
          <CardContent>
            <Typography variant="h4" sx={{ color: '#dc2626', mb: 2, textAlign: 'center' }}>
              Your QR Code
            </Typography>
            
            <Box className="qr-section">
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="User QR Code" className="qr-image" />
              )}
            </Box>
            
            <Box className="user-info">
              <Typography variant="h6" sx={{ color: '#dc2626', mb: 1 }}>
                {user.fullName || user.name}
              </Typography>
              <Typography sx={{ color: '#6b7280', mb: 0.5 }}>
                Blood Type: {user.bloodType}
              </Typography>
              <Typography sx={{ color: '#6b7280', mb: 0.5 }}>
                Email: {user.email}
              </Typography>
              <Typography sx={{ color: '#6b7280', mb: 2 }}>
                Phone: {user.phone}
              </Typography>
            </Box>
            
            <Box className="qr-actions">
              <Button 
                variant="contained" 
                onClick={downloadQR}
                sx={{ 
                  bgcolor: '#dc2626', 
                  mb: 2,
                  '&:hover': { bgcolor: '#b91c1c' } 
                }}
              >
                Download QR Code
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/dashboard')}
                sx={{ color: '#dc2626', borderColor: '#dc2626' }}
              >
                Back to Dashboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default UserQR