

import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/key.js';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/weather', async (req, res) => {
    const { cityName } = req.body;
  
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`);
      const data = await response.json();
  
      if (data.cod === '404') {
        return res.status(404).json({ weatherText: 'City is not found!' });
      }
  
      const city = data.name;
      const temperature = data.main.temp;
      return res.status(200).json({ cityName: city, temperature });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

export default app;
