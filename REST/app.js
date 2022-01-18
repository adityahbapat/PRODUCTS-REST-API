/* We are following MVC architecture.


const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
// ----------------------------------------------------------------
// morgan console logs the requests
// ----------------------------------------------------------------


// router being exported from respective module.exports, see files
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// CORS Error Handling
// Specify this before routes
// ----------------------------------------------------------------

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // if not all website replace * with domain http:myweb.com etc.

    // tell all headers accepted
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTONS'){
        // browser sends options request first before get or post

        res.header('Access-Control-Allow-Methods', 'GET, POST','PUT', 'PATCH','DELETE');
        return res.status(200).json({});
        // empty obj sent
    }
    next();
})

mongoose.connect("mongodb://localhost:27017/tcDB",{
    useNewUrlParser: true
});



// instead of body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
// here request works for get, post etc, it is middleware


// error handling
// ----------------------------------------------------------------
app.use(function(req, res, next) {
    const error = new Error('Not Found the Page buddy');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            // most error have message property
            message: error.message
        }
    })
});



// ----------------------------------------------------------------

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "It works!"
//     });
// });
// ----------------------------------------------------------------

// here app is not app.js 
module.exports = app;

*/

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');

mongoose.connect(
  "mongodb://node-shop:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shop-shard-00-00-wovcj.mongodb.net:27017,node-rest-shop-shard-00-01-wovcj.mongodb.net:27017,node-rest-shop-shard-00-02-wovcj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));


// do not need body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;