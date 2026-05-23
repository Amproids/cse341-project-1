const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Contacts API'
    },
    host: 'cse341-project-1-6smi.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
