import './About.css'
import founder from "../admin/HEMANTH.png"

function About() {
  return (
    <main className="about-page">
      <div className="about-container">
        <h1 className="page-title">About Us</h1>
        
        {/* Founder Section */}
        <section className="founder-section">
          <div className="founder-image">
            <img 
              src={founder} 
              alt="Founder" 
            />
          </div>
          <div className="founder-content">
            <h2>About Our Founder</h2>
            <h3>Mr. Kancharla Hemanth</h3>
            <p>
              Chinna is the founder of this blood donation initiative, driven by a strong belief that no life should be lost due to the unavailability of blood. As a student with a deep sense of social responsibility, he started this platform to bridge the gap between voluntary blood donors and people in urgent need.

                With a clear vision to build a fast, trustworthy, and community-driven blood donation network, Chinna actively encourages individuals—especially youth—to come forward and take part in saving lives. He believes that one unit of blood can be the reason someone gets a second chance at life.

                This initiative stands on the values of compassion, humanity, and service, aiming to ensure timely help during emergencies and to spread awareness about the importance of regular blood donation.
            </p>
            {/* <p>
              Her dedication stems from a personal experience when her younger brother required multiple 
              blood transfusions during his battle with leukemia. This experience ignited her passion 
              for creating a more efficient and accessible blood donation system.
            </p>
            <p>
              Under her leadership, our organization has facilitated over 10,000 successful blood 
              donations and saved countless lives across the community.
            </p> */}
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="mission-section">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <div className="mission-card">
              <h3>🎯 Our Purpose</h3>
              <p>
                To create a seamless connection between voluntary blood donors and patients in need, 
                ensuring no life is lost due to blood shortage.
              </p>
            </div>
            <div className="mission-card">
              <h3>💝 Our Values</h3>
              <p>
                Compassion, integrity, and community service drive everything we do. We believe in 
                the power of human kindness and the gift of life through blood donation.
              </p>
            </div>
            <div className="mission-card">
              <h3>🌟 Our Vision</h3>
              <p>
                To build a world where blood shortage is never a barrier to saving lives, creating 
                a sustainable network of dedicated donors and efficient distribution systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default About