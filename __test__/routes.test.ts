import request from 'supertest';
import app from '../src/app';
import pool from '../src/db/connection';
import { createCity, updateCity, deleteCity } from '../src/controller/cities';
import temperatures from '../src/controller/temperatures';
import forecasts from '../src/controller/forecasts';
import { createWebhooks, deleteWebhook } from '../src/controller/webhooks';
afterAll(async () => {
  // await UsersDb.collection.drop();
  // await AdminsDb.collection.drop();
  // await connection.close();
});
describe('Testing if Schemas exist', () => {
  it('Check user schema', () => {
    expect(pool).toBeDefined();
  });
  it('Check create city', () => {
    expect(createCity).toBeDefined();
  });
  it('Succesfully update city', () => {
    expect(updateCity).toBeDefined();
  });
  it('Check delete city', () => {
    expect(deleteCity).toBeDefined();
  });
  it('Check temperatures', () => {
    expect(temperatures).toBeDefined();
  });
  it('Check forecasts', () => {
    expect(forecasts).toBeDefined();
  });
  it('Check webhoooks creation', () => {
    expect(createWebhooks).toBeDefined();
  });
  it('Check delete webhook', () => {
    expect(deleteWebhook).toBeDefined();
  });
});
describe('City functionalities', () => {
  it('User can create a new city', async () => {
    const response = await request(app)
      .post('/cities')
      .send({
        name: 'Test City',
        latitude: 1.0,
        longitude: 1.0,
      })
      .expect(201);

    const expected = response.body;
    expect(expected).toHaveProperty('name');
    expect(expected).toHaveProperty('latitude');
    expect(expected).toHaveProperty('longitude');
  });
  it('User can update a city', async () => {
    const response = await request(app)
      .patch('/cities/3')
      .send({
        name: 'new City',
        latitude: 1.0,
        longitude: 1.0,
      })
      .expect(200);
    const expected = response.body.msg;
    expect(expected).toBe('City updated successfully.');
  });
  it('User can delete a city', async () => {
    const response = await request(app).delete('/cities/3').expect(200);
    const expected = response.body.msg;
    expect(expected).toBe('City deleted successfully.');
  });
});
describe('Temperature functionalities', () => {
  it('User can create a new temperature', async () => {
    const response = await request(app)
      .post('/temperatures')
      .send({
        city_id: 12,
        max: 23,
        min: 5,
      })
      .expect(201);

    const expected = response.body;
    expect(expected).toHaveProperty('city_id');
    expect(expected).toHaveProperty('max');
    expect(expected).toHaveProperty('min');
    expect(expected).toHaveProperty('timestamp');
  });
});
describe('Forecast functionalities', () => {
  it('User can get a specific forecast', async () => {
    const response = await request(app).get('/forecasts/8').expect(200);

    const expected = response.body;
    expect(expected).toHaveProperty('city_id');
    expect(expected).toHaveProperty('max');
    expect(expected).toHaveProperty('min');
    expect(expected).toHaveProperty('sample');
  });
});
describe('Webhook functionalities', () => {
  it('User can create a new webhook', async () => {
    const response = await request(app)
      .post('/webhooks')
      .send({
        city_id: 4,
        callback_url: 'http://google.com',
      })
      .expect(201);
    const expected = response.body;
    expect(expected).toHaveProperty('city_id');
    expect(expected).toHaveProperty('callback_url');
  });
  it('User can delete a webhook', async () => {
    const response = await request(app).delete('/webhooks/3').expect(200);

    const expected = response.body.msg;
    expect(expected).toBe('Webhook deleted successfully.');
  });
});
