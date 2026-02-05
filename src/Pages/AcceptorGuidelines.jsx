import { Typography, Card, CardContent, Box } from '@mui/material'
import { FaCheckCircle } from 'react-icons/fa'

function AcceptorGuidelines() {
  const guidelines = [
    {
      title: "Medical Documentation",
      description: "Provide valid medical prescription or hospital requirement letter",
      details: "Official documentation from licensed physician specifying blood type and units needed"
    },
    {
      title: "Blood Type Verification",
      description: "Confirm patient's blood type through official medical records",
      details: "Cross-matching reports and blood group certificates from certified laboratories"
    },
    {
      title: "Emergency Contact Information",
      description: "Provide multiple contact numbers for urgent communication",
      details: "Include primary contact, alternate contact, and hospital coordinator numbers"
    },
    {
      title: "Hospital Information",
      description: "Include complete hospital details and attending physician name",
      details: "Hospital address, department, doctor's contact, and patient admission details"
    },
    {
      title: "Response Availability",
      description: "Be available to respond within 2 hours of donor contact",
      details: "Maintain active communication channels and quick response for urgent cases"
    },
    {
      title: "Transportation Arrangements",
      description: "Ensure proper transportation for blood collection and delivery",
      details: "Coordinate with hospital blood bank and maintain cold chain requirements"
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
            Acceptor Guidelines
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, textAlign: 'center' }}>
            Important requirements and procedures for blood recipients
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

export default AcceptorGuidelines