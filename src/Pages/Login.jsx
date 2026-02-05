import { TextField, Button, Box, Typography, Card, CardContent, Alert } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../config/config'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
        // Store user data and tokens in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Check for admin token and navigate accordingly
        if (data.admintoken || data.adminToken) {
          localStorage.setItem('adminToken', data.admintoken || data.adminToken);
          setTimeout(() => {
            navigate('/admin/dashboard');
            window.location.reload();
          }, 1000);
        } else if (data.token) {
          localStorage.setItem('token', data.token);
          setTimeout(() => {
            navigate('/dashboard');
            window.location.reload();
          }, 1000);
        } else {
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1000);
        }
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        setMessage('Unable to connect to server. Please check your internet connection or try again later.');
      } else {
        setMessage('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
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
            Login
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, textAlign: 'center' }}>
            Access your blood donation account
          </Typography>
          
          {message && (
            <Alert severity={message.includes('successful') ? 'success' : 'error'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              sx={{ 
                mb: 2, 
                '& .MuiOutlinedInput-root': { color: 'white' }, 
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } 
              }}
            />
            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              sx={{ 
                mb: 3, 
                '& .MuiOutlinedInput-root': { color: 'white' }, 
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } 
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={loading}
              sx={{ 
                bgcolor: '#dc2626', 
                py: 1.5,
                fontSize: '1.1rem',
                mb: 2,
                '&:hover': { bgcolor: '#b91c1c' }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Button 
                onClick={() => navigate('/signup')}
                sx={{ color: 'rgba(255,255,255,0.8)', textTransform: 'none', mb: 1 }}
              >
                Don't have an account? Sign Up
              </Button>
              <br />
              <Button 
                onClick={() => navigate('/forgot-password')}
                sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'none', fontSize: '0.9rem' }}
              >
                Forgot Password?
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </main>
  )
}

export default Login