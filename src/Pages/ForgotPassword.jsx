import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material'
import { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Forgot password for:', email)
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
            Forgot Password
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, textAlign: 'center' }}>
            Enter your email to reset your password
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              sx={{ 
                bgcolor: '#dc2626', 
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#b91c1c' }
              }}
            >
              Reset Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </main>
  )
}

export default ForgotPassword