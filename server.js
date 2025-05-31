// Load environment variables
require('dotenv').config();

// Import required modules
const mongodb = require('./db/connect');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8080;

// Middleware for parsing JSON requests
app.use(express.json());

// Swagger API Documentation Route
// This creates an interactive API documentation interface at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route handlers
app.use('/contacts', require('./routes/contacts'));
app.use('/', require('./routes'));

// Initialize MongoDB connection and start server
mongodb.initDb((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        app.listen(port, () => {
            console.log('Web Server is listening at port ' + port);
            console.log(
                `API Documentation available at: http://localhost:${port}/api-docs`
            );
            console.log(
                'Production API Documentation: https://cse341-project-1-hvl8.onrender.com/api-docs'
            );
        });
    }
});
