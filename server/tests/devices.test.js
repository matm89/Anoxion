// jest.mock('express-validator');
jest.mock('../model/users');
jest.mock('../model/devices');

const request = require('supertest');
const app = require('../index');
const validator = require('express-validator');
const User = require('../model/users');
const Device = require('../model/devices');

// I literally donnt know why jest isnt recognised but tests still run so im cool w/ it :)

// resetting mockdata state each time
describe('GET /devices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // supertest to simulate requests @await request().
  // missing email should give error
  it('should return 400 if email is missing', async () => {
    const res = await request(app).get('/devices');
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  // okay eamil but actual user is missing
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

  // actually simulating a database error to confirm 500 error handling
  it('should return 500 on a server error', async () => {
    User.findOne.mockImplementation(() => {
      throw new Error('DB error');
    });

    const res = await request(app).get('/devices?email=test@example.com');
    expect(res.statusCode).toBe(500);
    expect(res.body).toBe('Internal Server Error');
  });
});


// POSTING
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

const { validationResult } = require('express-validator');

// POST checking
// TODO not working right now. 

describe('POST /devices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if validation errors exist', async () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        {
          msg: 'Device name is required',
          location: 'body',
          path: 'device',
          type: 'field',
          value: '',
        },
      ],
    });

    const res = await request(app).post('/devices').send({ device: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('Device name is required');
  });

  it('should return 500 if validation throws an error', async () => {
    validationResult.mockImplementation(() => {
      throw new Error('Unexpected failure');
    });

    const res = await request(app)
      .post('/devices')
      .send({ device: 'test-device' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toBe('Internal Server Error');
  });
});
