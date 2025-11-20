import request from 'supertest';
import app from '../src/app';

describe('GET /api', () => {
  it('should return API running message', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
