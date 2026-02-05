import './Terms.css'

function Terms() {
  return (
    <main className="terms-page">
      <div className="terms-container">
        <h1 className="page-title">Terms & Conditions</h1>
        <p className="last-updated">Last updated: December 2024</p>
        
        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Blood Donation Camp platform, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Donor Eligibility</h2>
            <ul>
              <li>Must be between 18-65 years of age</li>
              <li>Minimum weight of 50kg (110 lbs)</li>
              <li>Must be in good health condition</li>
              <li>No recent illness or medication that may affect donation</li>
              <li>Must pass medical screening before donation</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Medical Screening</h2>
            <p>
              All donors must undergo mandatory medical screening including but not limited to blood pressure check, 
              hemoglobin level testing, and health questionnaire. We reserve the right to defer or reject any donor 
              based on medical assessment.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Privacy and Data Protection</h2>
            <p>
              We are committed to protecting your personal information. All donor and recipient data is handled in 
              accordance with applicable privacy laws and medical confidentiality requirements. Personal information 
              will not be shared with third parties without explicit consent.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Liability and Risk</h2>
            <p>
              While we maintain the highest safety standards, blood donation carries inherent minimal risks. Donors 
              participate voluntarily and acknowledge understanding of potential side effects. Our organization maintains 
              appropriate insurance coverage for donor safety.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Service Availability</h2>
            <p>
              We strive to provide continuous service but cannot guarantee uninterrupted availability. Emergency 
              situations, maintenance, or technical issues may temporarily affect service. We are not liable for 
              any inconvenience caused by service interruptions.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Users will be notified of significant changes 
              via email or platform notifications. Continued use of the service after modifications constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Contact Information</h2>
            <p>
              For questions regarding these terms, please contact us at:
              <br />
              Email: legal@bloodcamp.org
              <br />
              Phone: (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Terms