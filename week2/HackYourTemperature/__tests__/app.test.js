

import app from '../app.js';
import supertest from 'supertest';

const app = require('../app.js');


const request = supertest(app);

describe('POST /', () => {
  it('should return the city name and temperature if the city exists', async () => {
    const response = await request.post('/').send({ city: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.cityName).toBe('London');
    expect(response.body.temperature).toBeDefined();
  });

  it('should return "City is not found!" if the city does not exist', async () => {
    const response = await request.post('/').send({ city: 'NonExistentCity' });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe('City is not found!');
  });

  it('should return a 400 error if city name is missing', async () => {
    const response = await request.post('/');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('City name is required');
  });
});
