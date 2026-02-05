const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://blood-donation-backend-eight.vercel.app' 
      : 'http://localhost:5000')
};

export default config;