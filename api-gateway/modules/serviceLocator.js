const axios = require('axios');
const config = require('../config/config');

let authInstances = [];
let apiInstances = [];
let logInstances = [];

const fetchServices = async () => {
    try {
        const res = await axios.get(config.serviceRegistryUrl);
        const services = res.data;

        authInstances = Object.keys(services)
            .filter(name => name.includes('authService'))
            .flatMap(name => services[name]);
        apiInstances = Object.keys(services)
            .filter(name => name.includes('apiService'))
            .flatMap(name => services[name]);
        logInstances = Object.keys(services)
            .filter(name => name.includes('logService'))
            .flatMap(name => services[name]);

    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

const getInstances = () => ({
    authInstances,
    apiInstances,
    logInstances
});

module.exports = {
    fetchServices,
    getInstances
};