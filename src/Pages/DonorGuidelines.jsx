import { Typography, Card, CardContent, Box } from '@mui/material'
import { FaCheckCircle } from 'react-icons/fa'

function DonorGuidelines() {
  const guidelines = [
    {
      title: "Age Requirement",
      description: "Must be between 18-65 years old",
      details: "Donors should be in their prime health years for safe donation"
    },
    {
      title: "Weight Requirement", 
      description: "Minimum weight of 50kg (110 lbs)",
      details: "Adequate body weight ensures donor safety during blood collection"
    },
    {
      title: "Health Status",
      description: "Must be in good health with no recent illness",
      details: "Free from cold, flu, or any infectious diseases for at least 2 weeks"
    },
    {
      title: "Donation Frequency",
      description: "Wait at least 56 days between whole blood donations",
      details: "Allows your body to fully replenish red blood cells and iron stores"
    },
    {
      title: "Pre-Donation Preparation",
      description: "Eat iron-rich foods, stay hydrated, get adequate sleep",
      details: "Have a good meal 3 hours before, drink plenty of water, avoid alcohol"
    },
    {
      title: "Medical History",
      description: "Disclose any medications or medical conditions",
      details: "Certain medications and conditions may temporarily defer donation"
    }
  ]

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
        maxWidth: 800,
        margin: '0 auto',
        mt: 4
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 1, textAlign: 'center' }}>
            Donor Guidelines
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, textAlign: 'center' }}>
            Essential requirements and preparation tips for safe blood donation
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {guidelines.map((guideline, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 2,
                p: 2,
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <FaCheckCircle style={{ color: '#dc2626', marginTop: '4px', fontSize: '1.5rem' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 0.5, fontWeight: 600 }}>
                    {guideline.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#dc2626', mb: 0.5, fontWeight: 500 }}>
                    {guideline.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    {guideline.details}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </main>
  )
}

export default DonorGuidelines