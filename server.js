require('dotenv').config();
const mongodb = require('./db/connect');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use('/contacts', require('./routes/contacts'));
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.PORT || 3000, () => {
            console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
        });
    }
});