const axios = require('axios');
const { fetchServices, getInstances } = require('../modules/serviceLocator');
const { generateToken } = require('../modules/serviceToken');

jest.mock('axios');
jest.mock('../modules/serviceToken');

describe('Service Locator', () => {

    // Setup
    beforeEach(() => {
        generateToken.mockReturnValue('mocked-token');
    });

    // Teardown
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch and categorize services correctly', async () => {
        const mockServices = {
            authService1:   ['http://auth1.com'],
            authService2:   ['http://auth2.com'],
            apiService1:    ['http://api1.com'],
            logService1:    ['http://log1.com']
        };

        axios.get.mockResolvedValue({ data: mockServices });

        await fetchServices();

        const instances = getInstances();
        expect(instances.authInstances).toEqual(['http://auth1.com', 'http://auth2.com']);
        expect(instances.apiInstances).toEqual(['http://api1.com']);
        expect(instances.logInstances).toEqual(['http://log1.com']);
    });

    it('should handle errors when fetching services', async () => {
        axios.get.mockRejectedValue(new Error('Service Unavailable'));

        console.error = jest.fn();

        await fetchServices();

        expect(console.error).toHaveBeenCalledWith('Error fetching services:', expect.any(Error));
    });

    it('should handle no services returned', async () => {
        axios.get.mockResolvedValue({ data: {} });

        await fetchServices();

        const instances = getInstances();
        expect(instances.authInstances).toEqual([]);
        expect(instances.apiInstances).toEqual([]);
        expect(instances.logInstances).toEqual([]);
    });

    it('should handle mixed service types', async () => {
        const mockServices = {
            authService1:   ['http://auth1.com'],
            apiService1:    ['http://api1.com'],
            logService1:    ['http://log1.com'],
            otherService1:  ['http://other1.com']
        };

        axios.get.mockResolvedValue({ data: mockServices });

        await fetchServices();

        const instances = getInstances();
        expect(instances.authInstances).toEqual(['http://auth1.com']);
        expect(instances.apiInstances).toEqual(['http://api1.com']);
        expect(instances.logInstances).toEqual(['http://log1.com']);
    });
});