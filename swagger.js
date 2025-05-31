const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Project 1',
        description: 'REST API for CSE 341 Project 1',
        version: '1.0.0'
    },
    host: 'cse341-project-1-hvl8.onrender.com',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Contact: {
            _id: '6830c1332164274e3bf8b9b3',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            favoriteColor: 'blue',
            birthday: '1990-01-15'
        },
        ContactInput: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            favoriteColor: 'blue',
            birthday: '1990-01-15'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
