const express = require("express");
const app = express();
const server = require("http").createServer(app);

const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const db_url = require('./config/db').MongoURI
const bodyParser = require('body-parser');

//import routes
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

//DB connection
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connected')).catch((err) => console.log(`Error connecting to DB : ${err}`))


//middlewares
app.use(bodyParser.json());


///---ROUTES--------///
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/user', authRoutes);
app.get('/api/v1', (req,res)=>{
    res.send(`<h1> Nodejs Rest API WIP</h1>`)
});



server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}/api/v1`);
});