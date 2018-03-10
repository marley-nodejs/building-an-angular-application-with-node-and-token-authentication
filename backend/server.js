const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


const User = require('./models/User.js');
const auth = require('./auth.js');

mongoose.Promise = Promise;

const posts = [
    {message: 'hello'},
    {message: 'hi'}
];

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({}, '-password -__v');
        res.send(users);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
});


app.get('/profile/:id', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id, '-password -__v');        
        res.send(user);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }    
});

mongoose.connect('mongodb://user:user1@ds255768.mlab.com:55768/building_angular_application_with_node_and_token_authentication', (err) => {
    if(err){
        console.log('error');
    }
    
    console.log('conected to mongo');
        
});

app.use('/auth', auth);

app.listen(3000);
