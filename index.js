const express = require("express");
const cors = require('cors');
const emailValidator = require('./api/validator')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', emailValidator);
app.use('/validate-email', require('./api/validator'))

const Port = process.env.PORT || 3555;
app.listen(Port, ()=>{
    console.log(`Server listening on Port ${Port}`)
});