import express from 'express';
import app from "./app.js";

const app = express();
app.use(express.json()); 
const port = process.env.PORT || 3000;


app.post('/', (req, res) => {
  
  const cityName = req.body.cityName;

 
  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  res.json({ cityName: cityName });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
