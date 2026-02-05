const isProduction = window.location.hostname !== 'localhost';

const config = {
  API_BASE_URL: isProduction 
    ? 'https://blood-donation-backend-2kmfdon96-chinna0107s-projects.vercel.app/api'
    : 'http://localhost:5000/api'
};

export default config;