import { TextField, Button, MenuItem, Box, Typography, Card, CardContent, Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'

function Acceptor() {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: '',
    unitsNeeded: '',
    urgency: '',
    hospital: '',
    hospitalAddress: '',
    contactName: '',
    phone: '',
    email: ''
  })
  const [verificationStep, setVerificationStep] = useState('form') // 'form', 'verification', 'verified'
  const [verificationCode, setVerificationCode] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const sendVerificationEmail = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/requests/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
        setVerificationStep('verification');
      } else {
        setMessage(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const verifyCode = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/requests/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          code: verificationCode 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setVerificationStep('verified');
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (verificationStep === 'form') {
      sendVerificationEmail()
    } else if (verificationStep === 'verified') {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/requests/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          setMessage(data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setMessage(data.error || 'Request submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
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
        maxWidth: 600,
        margin: '0 auto',
        mt: 4
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 1, textAlign: 'center' }}>
            Request Blood
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, textAlign: 'center' }}>
            Submit your blood requirement and we'll connect you with donors
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            {message && (
              <Alert severity={verificationStep === 'verified' ? 'success' : 'info'} sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}
            
            {verificationStep === 'verification' && (
              <TextField
                fullWidth
                required
                label="Enter Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            )}
            
            {verificationStep === 'verification' ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  onClick={verifyCode}
                  variant="contained" 
                  disabled={loading}
                  sx={{ 
                    bgcolor: '#dc2626', 
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': { bgcolor: '#b91c1c' }
                  }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Verify Code'}
                </Button>
                <Button 
                  onClick={sendVerificationEmail}
                  variant="outlined" 
                  disabled={loading}
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Resend Code
                </Button>
              </Box>
            ) : (
              <>
            <TextField
              fullWidth
              required
              label="Patient Name"
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              select
              label="Blood Type Needed"
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
              type="number"
              label="Units Needed"
              value={formData.unitsNeeded}
              onChange={(e) => setFormData({...formData, unitsNeeded: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              select
              label="Urgency Level"
              value={formData.urgency}
              onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </TextField>
            <TextField
              fullWidth
              required
              label="Hospital Name"
              value={formData.hospital}
              onChange={(e) => setFormData({...formData, hospital: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              multiline
              rows={2}
              label="Hospital Address"
              value={formData.hospitalAddress}
              onChange={(e) => setFormData({...formData, hospitalAddress: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <TextField
              fullWidth
              required
              label="Contact Person Name"
              value={formData.contactName}
              onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
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
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={verificationStep === 'verification' || loading}
              sx={{ 
                bgcolor: '#dc2626', 
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#b91c1c' }
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                verificationStep === 'form' ? 'Send Verification Email' : 'Submit Blood Request'
              )}
            </Button>
            </>
            )}
          </Box>
        </CardContent>
      </Card>
    </main>
  )
}

export default Acceptor