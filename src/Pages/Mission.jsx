import './Mission.css'

function Mission() {
  return (
    <main className="mission-page">
      <div className="mission-container">
        <h1 className="page-title">Our Mission</h1>
        
        <section className="mission-statement">
          <div className="mission-icon">🎯</div>
          <h2>Mission Statement</h2>
          <p>
            To create a seamless, life-saving connection between voluntary blood donors and patients in critical need, 
            ensuring that no life is lost due to blood shortage while maintaining the highest standards of safety, 
            efficiency, and compassion in our services.
          </p>
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Compassion</h3>
              <p>We approach every interaction with empathy, understanding the urgency and emotional weight of blood donation needs.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Safety First</h3>
              <p>We maintain the highest medical standards and protocols to ensure the safety of both donors and recipients.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We believe in the power of community support and work to build lasting relationships with donors and healthcare partners.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>We strive to make the donation process as quick and convenient as possible while maintaining quality standards.</p>
            </div>
          </div>
        </section>

        <section className="goals-section">
          <h2>Our Goals</h2>
          <div className="goals-list">
            <div className="goal-item">
              <span className="goal-number">01</span>
              <div>
                <h3>Eliminate Blood Shortages</h3>
                <p>Work towards a future where blood shortage is never a barrier to saving lives in our community.</p>
              </div>
            </div>
            <div className="goal-item">
              <span className="goal-number">02</span>
              <div>
                <h3>Expand Donor Network</h3>
                <p>Continuously grow our network of dedicated donors to meet increasing healthcare demands.</p>
              </div>
            </div>
            <div className="goal-item">
              <span className="goal-number">03</span>
              <div>
                <h3>Improve Accessibility</h3>
                <p>Make blood donation and request processes more accessible through technology and community outreach.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Mission