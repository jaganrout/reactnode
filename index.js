const express = require('express');
const mongooes = require('mongoose');
const session = require('express-session');
const crypto = require('crypto')
const Razorpay = require('razorpay');
const restaurant = require('./routes/restaurant');
const app =express();
app.use(
    session(
        {
            resave:true,
            secret:'123456',
            saveUninitialized:true
         
        }
    )
);
app.use(restaurant);
mongooes.connect('mongodb://localhost:27017/bnb')
.then(result =>{
   app.listen(4000);   
   console.log("database connection successful")
})
.catch(err=>{
    console.log(err);
})
