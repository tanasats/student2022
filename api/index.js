const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

var corsOptions = {
	//origin: ["http://localhost:4200","http://0.0.0.0:4200"],
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
//app.use(cors());

global.__basedir = 'c:/temp';


// trimmer MIDDLEWARE
const {trimmer,debugShowURL} = require('./middleware/utils')
app.use(debugShowURL);
app.use(trimmer);


app.get('/',(req,res)=>{
 res.send("test OK!")
})

// AUTH ROUTH 
//const authRouteV1 = require('./route/auth.route');
//app.use('/api/v1', authRouteV1);
// USER ROUTE
const authRouteV1 = require('./route/auth.route');
app.use('/api/v1', authRouteV1);
const userRouteV1 = require('./route/user.route');
app.use('/api/v1', userRouteV1);
const acttypeRouteV1 = require('./route/acttype.route');
app.use('/api/v1', acttypeRouteV1);


const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

