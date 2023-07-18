const express = require('express');
const connectToDB = require('./config/database')
const cors = require('cors')
require('dotenv').config();

const app = express()

connectToDB();

app.use(cors({
    origin: '*'
}));
app.use(express.json({extended : false}));

app.use('/' , require('./routes/index'));
app.use('/api/url' , require('./routes/url'))

const port = process.env.PORT || 5000

app.listen(port , () => console.log(`server running on port ${port}`))