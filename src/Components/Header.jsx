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
      bgcolor: 'rgba(220, 38, 38, 0.1)', 
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      width: '100vw' 
    }}>
      <Toolbar sx={{ width: '100%', maxWidth: 'none' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Blood Donation Camp
        </Typography>
        
        <Button color="inherit" onClick={(e) => setAcceptorMenu(e.currentTarget)}>
          Acceptor
        </Button>
        <Menu anchorEl={acceptorMenu} open={Boolean(acceptorMenu)} onClose={() => setAcceptorMenu(null)}>
         
          <MenuItem onClick={() => { navigate('/acceptor'); setAcceptorMenu(null); }}>Request Blood</MenuItem>
           <MenuItem onClick={() => { navigate('/acceptor-guidelines'); setAcceptorMenu(null); }}>Acceptor Guidelines</MenuItem>
        </Menu>

        <Button color="inherit" onClick={(e) => setDonorMenu(e.currentTarget)}>
          Donor
        </Button>
        <Menu anchorEl={donorMenu} open={Boolean(donorMenu)} onClose={() => setDonorMenu(null)}>
          <MenuItem onClick={() => { navigate('/donor'); setDonorMenu(null); }}>Register as Donor</MenuItem>
          <MenuItem onClick={() => { navigate('/donor-guidelines'); setDonorMenu(null); }}>Donor Guidelines</MenuItem>
        </Menu>

        <Button color="inherit" onClick={(e) => setAboutMenu(e.currentTarget)}>
          <HiDotsHorizontal />
        </Button>
        <Menu anchorEl={aboutMenu} open={Boolean(aboutMenu)} onClose={() => setAboutMenu(null)}>
          <MenuItem onClick={() => { navigate('/about'); setAboutMenu(null); }}>About Us</MenuItem>
          <MenuItem onClick={() => { navigate('/mission'); setAboutMenu(null); }}>Mission</MenuItem>
          <MenuItem onClick={() => { navigate('/terms'); setAboutMenu(null); }}>Terms & Conditions</MenuItem>
          <MenuItem onClick={() => { navigate('/privacy'); setAboutMenu(null); }}>Privacy Policy</MenuItem>
          <MenuItem onClick={() => { navigate('/contact'); setAboutMenu(null); }}>Contact Us</MenuItem>
          <MenuItem onClick={() => { navigate('/login'); setAboutMenu(null); }}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header