import './Privacy.css'

function Privacy() {
  return (
    <main className="privacy-page">
      <div className="privacy-container">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="last-updated">Last updated: December 2024</p>
        
        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name, age, and contact information</li>
              <li>Blood type and medical history relevant to donation</li>
              <li>Emergency contact details</li>
              <li>Donation history and preferences</li>
            </ul>
            <h3>Medical Information</h3>
            <ul>
              <li>Health screening results</li>
              <li>Blood test results</li>
              <li>Medical eligibility assessments</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To facilitate blood donation and matching processes</li>
              <li>To ensure donor and recipient safety</li>
              <li>To maintain donation records and history</li>
              <li>To communicate important updates and notifications</li>
              <li>To improve our services and user experience</li>
              <li>To comply with medical and legal requirements</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul>
              <li>With healthcare providers for medical purposes</li>
              <li>With emergency contacts in case of medical emergencies</li>
              <li>When required by law or legal process</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul>
              <li>Encrypted data transmission and storage</li>
              <li>Secure access controls and authentication</li>
              <li>Regular security audits and updates</li>
              <li>Staff training on privacy and security protocols</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and comply with legal requirements. 
              Donation records are typically maintained for 10 years as per medical standards. You may request deletion of 
              your account and associated data, subject to legal and medical record-keeping requirements.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of non-essential communications</li>
              <li>File a complaint with relevant authorities</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Cookies and Tracking</h2>
            <p>
              Our website uses cookies to improve user experience and analyze usage patterns. You can control cookie 
              preferences through your browser settings. Essential cookies required for platform functionality cannot be disabled.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Contact Us</h2>
            <p>
              For privacy-related questions or concerns, contact our Privacy Officer:
              <br />
              Email: privacy@bloodcamp.org
              <br />
              Phone: (555) 123-4567
              <br />
              Address: 123 Health Street, Medical City, MC 12345
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Privacy