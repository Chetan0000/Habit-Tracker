const express = require('express');
const app = express();
const PORT = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

// set up static files
app.use(express.static('./assets'));
// app.use(expressLayouts);

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use('/', require('./routs'));

app.listen(PORT , (error) => {
    if(error){console.log(`Error in running the server ${error}`);}

    console.log(`Server is up and running `);
    
})
