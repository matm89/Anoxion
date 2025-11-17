const request = require('supertest');
const app = require('../index');
const User = require('../model/users');
const Device = require('../model/devices');

jest.mock('../model/users');
jest.mock('../model/devices');

describe('GET /devices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email is missing', async () => {
    const res = await request(app).get('/devices');
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should return 404 if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app).get('/devices?email=test@example.com');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
    expect(res.body.devices).toEqual([]);
  });

  it('should return 200 and device list if user is found', async () => {
    const mockUser = { email: 'test@example.com', devices: ['dev1', 'dev2'] };
    const mockDevices = [{ device: 'dev1' }, { device: 'dev2' }];

    User.findOne.mockResolvedValue(mockUser);
    Device.find.mockResolvedValue(mockDevices);

    const res = await request(app).get('/devices?email=test@example.com');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockDevices);
  });

  it('should return 500 on server error', async () => {
    User.findOne.mockImplementation(() => {
      throw new Error('DB error');
    });

    const res = await request(app).get('/devices?email=test@example.com');
    expect(res.statusCode).toBe(500);
    expect(res.body).toBe('Internal Server Error');
  });
});
