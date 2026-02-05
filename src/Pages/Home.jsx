import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🩸 Saving Lives Since 2018</div>
          <h1>Save Lives Through Blood Donation</h1>
          <p>Your single donation can save up to three lives. Join our community of heroes making a difference every day.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/donor')}>Become a Donor</button>
            <button className="btn-secondary" onClick={() => navigate('/acceptor')}>Request Blood</button>
          </div>
          <div className="hero-stats">
            <span>✅ 10,000+ Lives Saved</span>
            <span>⚡ 24/7 Emergency Support</span>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop" alt="Blood donation" />
          <div className="floating-card">
            <div className="pulse-dot"></div>
            <span>Live Donations</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <h3>10,000+</h3>
          <p>Lives Saved</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h3>5,000+</h3>
          <p>Active Donors</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚨</div>
          <h3>24/7</h3>
          <p>Emergency Support</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <h3>100+</h3>
          <p>Partner Hospitals</p>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="blood-types-section">
        <h2>Blood Types We Need</h2>
        <div className="blood-types-grid">
          <div className="blood-type-card urgent">
            <div className="blood-type">O-</div>
            <div className="urgency">URGENT</div>
            <p>Universal donor - Always in high demand</p>
          </div>
          <div className="blood-type-card high">
            <div className="blood-type">A+</div>
            <div className="urgency">HIGH</div>
            <p>Most common type - Frequently needed</p>
          </div>
          <div className="blood-type-card medium">
            <div className="blood-type">B+</div>
            <div className="urgency">MEDIUM</div>
            <p>Regular demand - Your help matters</p>
          </div>
          <div className="blood-type-card low">
            <div className="blood-type">AB+</div>
            <div className="urgency">LOW</div>
            <p>Universal recipient - Still valuable</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safe & Secure</h3>
            <p>All donations follow strict medical protocols and safety standards</p>
            <div className="feature-badge">ISO Certified</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Process</h3>
            <p>Fast registration and donation process with minimal waiting time</p>
            <div className="feature-badge">15 Min Average</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Hospital Network</h3>
            <p>Connected with major hospitals for immediate blood availability</p>
            <div className="feature-badge">100+ Partners</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Easy Tracking</h3>
            <p>Track your donations and see the impact you're making</p>
            <div className="feature-badge">Real-time Updates</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Heroes Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Donating blood here was incredibly easy and the staff made me feel like a true hero. Knowing I saved lives gives me immense satisfaction."</p>
            </div>
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="John" />
              <div>
                <h4>John Smith</h4>
                <span>Regular Donor - 25 donations</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"When my daughter needed blood urgently, this organization connected us with donors within hours. They literally saved her life."</p>
            </div>
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Sarah" />
              <div>
                <h4>Sarah Johnson</h4>
                <span>Grateful Parent</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The mobile app makes it so convenient to schedule donations and track my impact. I've donated 15 times this year!"</p>
            </div>
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Mike" />
              <div>
                <h4>Mike Davis</h4>
                <span>Tech Professional - 15 donations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert Section */}
      <section className="emergency-section">
        <div className="emergency-content">
          <div className="emergency-icon">🚨</div>
          <h2>Emergency Blood Needed</h2>
          <p>Critical shortage of O- blood type. Your immediate donation can save lives today.</p>
          <button className="btn-emergency" onClick={() => navigate('/donor')}>Donate Now</button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of donors who are already saving lives in our community</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate('/donor')}>Start Donating Today</button>
          <button className="btn-outline" onClick={() => navigate('/about')}>Learn More About Us</button>
        </div>
        <div className="cta-features">
          <span>✅ Free Health Checkup</span>
          <span>✅ Donation Certificate</span>
          <span>✅ Impact Tracking</span>
        </div>
      </section>
    </main>
  )
}

export default Home