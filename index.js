const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');
const { auth, JWT_SECRET } = require('./auth')
const { UserModel, TodoModel } = require('./db')

mongoose.connect("mongodb+srv://sahil2005:N8WJYc1k39faUGgL@cluster0.ti11j.mongodb.net/todos-week7")

const app = express();
app.use(express.json());

app.post('/signup',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email:email,
        password: password,
        name: name
    })

    res.json({
        message: "You are signed up"
    })
})

app.post('/signin',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    
    const response = await UserModel.findOne({
        email:email,
        password:password
    });

    if(response){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET);
        res.json({
            message: "you are signed in",
            token: token
        })
    } else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
    
})