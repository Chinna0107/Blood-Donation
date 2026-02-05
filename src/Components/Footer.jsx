import './Footer.css'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>Dedicated to saving lives through blood donation</p>
          <p>Connecting donors with those in need</p>
          <button onClick={() => navigate('/about')}>Learn More</button>
        </div>
        
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Blood Donation Registration</li>
            <li>Blood Request System</li>
            <li>Donor Guidelines</li>
            <li>Emergency Blood Services</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><button onClick={() => navigate('/donor')}>Become a Donor</button></li>
            <li><button onClick={() => navigate('/acceptor')}>Request Blood</button></li>
            <li><button onClick={() => navigate('/donor-guidelines')}>Donor Guidelines</button></li>
            <li><button onClick={() => navigate('/acceptor-guidelines')}>Acceptor Guidelines</button></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧  hk0107.blooddonation@gmail.com</p>
          <p>📞  +91 81798 60935</p>
          <p>📍  Tirupathi</p>
          <button onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Blood Donation Camp. All rights reserved. | Last updated: December 2024</p>
      </div>
    </footer>
  )
}

export default Footer