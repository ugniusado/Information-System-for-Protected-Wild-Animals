const request = require('supertest');
const express = require('express');
const app = require('./app');

// Mock multer middleware for file upload
jest.mock('multer', () => () => ({
  single: jest.fn().mockReturnValue((req, res, next) => {
    req.file = { filename: 'test.jpg' };
    next();
  }),
}));

describe('Test the /spotted path', () => {
  test('It should respond to the POST method', async () => {
    // Mock request body
    const requestBody = {
      name: 'John Doe',
      surname: 'johndoe@example.com',
      description: 'A cute bunny',
      lat: '55.1694',
      lng: '23.8813',
    };

    // Mock MySQL connection
    const mockQuery = jest.fn((sql, values, callback) => callback(null, {}));
    const mockCon = { query: mockQuery };
    jest.mock('mysql', () => ({ createConnection: () => mockCon }));

    const response = await request(app)
      .post('/spotted')
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Data received');
    expect(mockQuery).toHaveBeenCalledWith(
      'INSERT INTO spottings (name, surname, description, file, lat, lng) VALUES (?, ?, ?, ?, ?, ?)',
      ['John Doe', 'johndoe@example.com', 'A cute bunny', 'test.jpg', '55.1694', '23.8813'],
      expect.any(Function)
    );
  });

  test('It should handle database errors', async () => {
    // Mock request body
    const requestBody = {
      name: 'John Doe',
      surname: 'johndoe@example.com',
      description: 'A cute bunny',
      lat: '55.1694',
      lng: '23.8813',
    };

    // Mock MySQL connection with an error
    const mockQuery = jest.fn((sql, values, callback) => callback(new Error('Database error'), null));
    const mockCon = { query: mockQuery };
    jest.mock('mysql', () => ({ createConnection: () => mockCon }));

    const response = await request(app)
      .post('/spotted')
      .send(requestBody);

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Error inserting data');
  });

  test('It should handle missing required fields', async () => {
    // Mock request body without required fields
    const requestBody = {};

    const response = await request(app)
      .post('/spotted')
      .send(requestBody);

    // Assumes your app sends 400 status for bad requests. 
    // You might need to adjust this based on your app's actual behavior.
    expect(response.statusCode).toBe(400);
  });
});
