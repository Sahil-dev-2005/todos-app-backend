const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const { auth,JWT_SECRET } = require('./auth')
const { UserModel,TodoModel } = require('./db')

const app = express();
app.use(express.json());

app.post('/signup',function(req,res){

})

app.post('/signup',function(req,res){
    
})