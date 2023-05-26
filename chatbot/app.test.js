const request = require('supertest');
const express = require('express');
const axios = require('axios');
jest.mock('axios');

const app = require('./server'); 

describe('POST /api/gpt3', () => {
    it('should respond with an animal related message', async () => {
        const prompt = 'Tell me about foxes';
        const completion = 'Foxes are small to medium-sized omnivorous mammals...';
        axios.post.mockResolvedValue({ data: { choices: [{ text: completion }] } });

        const response = await request(app)
            .post('/api/gpt3')
            .send({ text: prompt });

        expect(response.statusCode).toBe(200);
        expect(response.body.output).toEqual(completion);
    });

    it('should respond with an error message for non-animal related questions', async () => {
        const prompt = 'Tell me about cars';

        const response = await request(app)
            .post('/api/gpt3')
            .send({ text: prompt });

        expect(response.statusCode).toBe(200);
        expect(response.body.output).toEqual('Sorry, I am programmed to answer questions about animals only.');
    });

    it('should respond with a 500 status code when the GPT-3 API call fails', async () => {
        const prompt = 'Tell me about foxes';
        axios.post.mockRejectedValue(new Error('GPT-3 API call failed'));

        const response = await request(app)
            .post('/api/gpt3')
            .send({ text: prompt });

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toEqual('GPT-3 API call failed');
    });
});
