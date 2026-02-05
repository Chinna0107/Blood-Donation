import { TextField, Button, Box, Typography, Card, CardContent, MenuItem, Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../config/config'

function Signup() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    aadhar: '',
    bloodType: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(data.message || 'OTP sent successfully')
        setStep(2)
      } else {
        setMessage(data.error || 'Failed to send OTP')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(data.message || 'OTP verified successfully')
        setStep(3)
      } else {
        setMessage(data.error || 'Invalid OTP')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDetailsSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...formData })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(data.message || 'Registration completed successfully')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setMessage(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Box component="form" onSubmit={handleEmailSubmit}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ bgcolor: '#dc2626', py: 1.5, '&:hover': { bgcolor: '#b91c1c' } }}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Send OTP'}
            </Button>
          </Box>
        )
      case 2:
        return (
          <Box component="form" onSubmit={handleOtpSubmit}>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, textAlign: 'center' }}>
              OTP sent to {email}
            </Typography>
            <TextField
              fullWidth
              required
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ bgcolor: '#dc2626', py: 1.5, '&:hover': { bgcolor: '#b91c1c' } }}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Verify OTP'}
            </Button>
          </Box>
        )
      case 3:
        return (
          <Box component="form" onSubmit={handleDetailsSubmit}>
            <TextField
              fullWidth
              required
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              label="Aadhar Number"
              value={formData.aadhar}
              onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              select
              label="Blood Type"
              value={formData.bloodType}
              onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              required
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              multiline
              rows={2}
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ bgcolor: '#dc2626', py: 1.5, '&:hover': { bgcolor: '#b91c1c' } }}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Complete Registration'}
            </Button>
          </Box>
        )
    }
  }

  return (
    <main className="main-content">
      <div className="pin pin-top-left"></div>
      <div className="pin pin-top-right"></div>
      <div className="pin pin-bottom-left"></div>
      <div className="pin pin-bottom-right"></div>
      
      <Card sx={{ 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        maxWidth: 400,
        margin: '0 auto',
        mt: 4
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 1, textAlign: 'center' }}>
            Sign Up - Step {step}/3
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, textAlign: 'center' }}>
            {step === 1 && 'Enter your email to get started'}
            {step === 2 && 'Verify your email with OTP'}
            {step === 3 && 'Complete your profile details'}
          </Typography>
          
          {message && (
            <Alert severity={step === 3 && message.includes('success') ? 'success' : 'info'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          
          {renderStep()}
        </CardContent>
      </Card>
    </main>
  )
}

export default Signup