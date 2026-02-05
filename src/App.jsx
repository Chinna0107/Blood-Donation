import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Components/Header'
import UserHeader from './Components/UserHeader'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Donor from './Pages/Donor'
import Acceptor from './Pages/Acceptor'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Mission from './Pages/Mission'
import DonorGuidelines from './Pages/DonorGuidelines'
import AcceptorGuidelines from './Pages/AcceptorGuidelines'
import Privacy from './Pages/Privacy'
import Terms from './Pages/Terms'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import Dashboard from './userpages/Dashboard'
import UserQR from './userpages/UserQR'
import UserProfile from './userpages/UserProfile'
import AdminDashboard from './admin/AdminDashboard'
import ManageDonors from './admin/ManageDonors'
import ManageRequests from './admin/ManageRequests'
import GenerateReports from './admin/GenerateReports'
import AdminSettings from './admin/AdminSettings'
import UserAbout from './userpages/UserAbout'
import PreviousDonations from './userpages/PreviousDonations'
import PreviousAccepted from './userpages/PreviousAccepted'
import FindDonor from './userpages/FindDonors'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdminRoute, setIsAdminRoute] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const adminToken = localStorage.getItem('adminToken')
    setIsLoggedIn(!!(token || adminToken))
    
    // Check if current path is admin route
    setIsAdminRoute(window.location.pathname.startsWith('/admin'))
  }, [])
  return (
    <Router>
      <div className="app">
        {!isAdminRoute && (isLoggedIn ? <UserHeader /> : <Header />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor" element={<Donor />} />
          <Route path="/acceptor" element={<Acceptor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/fdonar" element={<FindDonor />} />
        
          <Route path="/donor-guidelines" element={<DonorGuidelines />} />
          <Route path="/acceptor-guidelines" element={<AcceptorGuidelines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pdonor" element={<PreviousDonations />} />
          <Route path="/pacceptor" element={<PreviousAccepted />} />
          <Route path='/userabout' element={<UserAbout />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/qr" element={<UserQR />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/donors" element={<ManageDonors />} />
          <Route path="/admin/requests" element={<ManageRequests />} />
          <Route path="/admin/reports" element={<GenerateReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
        {!isLoggedIn && !isAdminRoute && <Footer />}
      </div>
    </Router>
  )
}

export default App
