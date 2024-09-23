const express = require('express');
const request = require('supertest');
const setupHealthCheck = require('../modules/serviceHealthCheck');
const { getInstances } = require('../modules/serviceLocator');
const { generateToken } = require('../modules/serviceToken');
const axios = require('axios');

jest.mock('axios');
jest.mock('../modules/serviceLocator');
jest.mock('../modules/serviceToken');

describe('Health Checks', () => {
    let app;

    // Setup
    beforeEach(() => {
        app = express();
        setupHealthCheck(app);
    });

    it('should return health status of all services', async () => {
        const mockInstances = {
            authInstances:  ['http://auth-service-1', 'http://auth-service-2'],
            apiInstances:   ['http://api-service-1', 'http://api-service-2'],
            logInstances:   ['http://log-service-1']
        };

        getInstances.mockReturnValue(mockInstances);
        generateToken.mockReturnValue('mock-token');

        axios.get.mockImplementation((url) => {
            if (url.includes('auth-service')) {
                return Promise.resolve({ status: 200 });
            } else if (url.includes('api-service')) {
                return Promise.resolve({ status: 200 });
            } else if (url.includes('log-service')) {
                return Promise.resolve({ status: 200 });
            }
            return Promise.reject(new Error('Service Unavailable'));
        });

        const res = await request(app).get('/health');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            authServices: [
                { instance: 'http://auth-service-1', status: 'healthy' },
                { instance: 'http://auth-service-2', status: 'healthy' }
            ],
            apiServices: [
                { instance: 'http://api-service-1', status: 'healthy' },
                { instance: 'http://api-service-2', status: 'healthy' }
            ],
            logServices: [
                { instance: 'http://log-service-1', status: 'healthy' }
            ]
        });
    });

    it('should return unhealthy status for services that are down', async () => {
        const mockInstances = {
            authInstances: ['http://auth-service-1'],
            apiInstances: ['http://api-service-1'],
            logInstances: ['http://log-service-1']
        };

        getInstances.mockReturnValue(mockInstances);
        generateToken.mockReturnValue('mock-token');

        axios.get.mockImplementation((url) => {
            if (url.includes('auth-service')) {
                return Promise.reject(new Error('Service Unavailable'));
            } else if (url.includes('api-service')) {
                return Promise.resolve({ status: 200 });
            } else if (url.includes('log-service')) {
                return Promise.reject(new Error('Service Unavailable'));
            }
            return Promise.reject(new Error('Service Unavailable'));
        });

        const res = await request(app).get('/health');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            authServices: [
                { instance: 'http://auth-service-1', status: 'unhealthy' }
            ],
            apiServices: [
                { instance: 'http://api-service-1', status: 'healthy' }
            ],
            logServices: [
                { instance: 'http://log-service-1', status: 'unhealthy' }
            ]
        });
    });
});