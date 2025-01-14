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
});

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
});

app.post('/todo',auth, async function(req,res){
    const task = req.body.task;
    const done = req.body.done;
    const userId = req.id;

    await TodoModel.create({
        userID:userId,
        task: task,
        done: done
    })

    res.json({
        message: "todo added successfully"
    })
});

app.get('/todos',auth,async function(req,res){
    const userId = req.id;
    const todos = await TodoModel.find({
        userId : userId
    });
    res.json({
        todos
    });
});

app.listen(3000);