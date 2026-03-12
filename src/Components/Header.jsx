import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [donorMenu, setDonorMenu] = useState(null)
  const [acceptorMenu, setAcceptorMenu] = useState(null)
  const [aboutMenu, setAboutMenu] = useState(null)
  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(15, 76, 58, 0.8) 50%, rgba(34, 197, 94, 0.8) 100%)', 
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      width: '100vw' 
    }}>
      <Toolbar sx={{ 
        width: '100%', 
        maxWidth: 'none',
        '@media (max-width: 600px)': {
          padding: '8px 16px'
        }
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            '@media (max-width: 600px)': {
              fontSize: '0.9rem'
            }
          }} 
          onClick={() => navigate('/')}
        >
          <b style={{ color: '#22c55e' }}>Hemanth Kancharla</b>  Blood Donation Camp
        </Typography>
        
        {/* <Button color="inherit" onClick={(e) => setAcceptorMenu(e.currentTarget)}>
          Acceptor
        </Button> */}
        <Menu anchorEl={acceptorMenu} open={Boolean(acceptorMenu)} onClose={() => setAcceptorMenu(null)}>
         
         
        </Menu>

        {/* <Button color="inherit" onClick={(e) => setDonorMenu(e.currentTarget)}>
          Donor
        </Button> */}
        <Menu anchorEl={donorMenu} open={Boolean(donorMenu)} onClose={() => setDonorMenu(null)}>
         
        </Menu>

        <Button color="inherit" onClick={(e) => setAboutMenu(e.currentTarget)}>
          <HiDotsHorizontal />
        </Button>
        <Menu 
          anchorEl={aboutMenu} 
          open={Boolean(aboutMenu)} 
          onClose={() => setAboutMenu(null)}
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 76, 58, 0.95) 50%, rgba(34, 197, 94, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              '& .MuiMenuItem-root': {
                color: '#fff',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          }}
        >
           <MenuItem onClick={() => { setAboutMenu(null); navigate('/acceptor'); }}>Request Blood</MenuItem>
           <MenuItem onClick={() => { setAboutMenu(null); navigate('/acceptor-guidelines'); }}>Acceptor Guidelines</MenuItem>
            <MenuItem onClick={() => { setAboutMenu(null); navigate('/donor'); }}>Register as Donor</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/donor-guidelines'); }}>Donor Guidelines</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/about'); }}>About Us</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/mission'); }}>Mission</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/terms'); }}>Terms & Conditions</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/privacy'); }}>Privacy Policy</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/contact'); }}>Contact Us</MenuItem>
          <MenuItem onClick={() => { setAboutMenu(null); navigate('/login'); }}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header