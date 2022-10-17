const express = require("express")
const http = require("http")
const cors = require("cors")
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

const app = express()
// configure cors with express
app.use(cors());
require('dotenv').config();
// configure express to accept form data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const server = http.createServer(app)

mongoose.connect(process.env.MONGODB_CLOUD_URL, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then((response) => {
    console.log('Connected to Mongo DB Successfully..............');
}).catch((error) => {
    console.error(error);
    process.exit(1); 
});

app.use('/user', require('./router/userRouter'));
app.use('/message', require('./router/messageRouter'));

server.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}...`)
)