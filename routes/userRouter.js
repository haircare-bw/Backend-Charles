//import express
const express = require('express');

//import database
const Users = require('../models/userDb.js');
const restricted = require('../middleware/restricted.js');
//define the Router
const router = express.Router();

//make a constant reply for 404 & 500
const sendErr = (msg, res) => {
    res.status(500).json({ errorMessage: `${msg}` })
};

const sendMissing = (res) => {
    res.status(404).json({ errorMessage: 'The User does not exist.' });
}

//////////////////////////////////////////////////////////MAKE CRUD ENDPOINTS///////////////////////////////////
//get requests all users
    router.get('/', restricted, (req, res) => {
    Users
        .get()
        .then( user => {
            res.json(user);
        })
        .catch( err => res.send(err));
    });


//get user by id 
    router.get('/:id', (req, res) => {
        res.status(200).json(req.user)  
    }
);

//NEW USER using post
router.post('/', (req, res) => {
    Users.insert(req.body)
        .then(user => {
            //console.log(user);
            res.status(200).json({
                message: 'User created, congratz!!!'
            });
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({
                message: 'Error creating the user within the post command.'
            });
        })
    }
);

//update user
    router.put('/:id', (req, res) => {
        //define id 
        const ID = req.params.id
    
        //define req.body
        const { username, password, type } = req.body;
        const user = { username, password, type };
    
        //check the req body
        if(!username || !password ) { 
        return res.status(400).json({ error: 'Please provide the NEW user name or password' });
        }
        Users
        .update(ID, user)
        .then( person => {
        if (person === undefined) {
            return sendMissing(res);
        }
        else{
            newUser = { ID, username, password, type }
            return res.status(201).json(newUser);
        }
        })
        .catch( err => {
        return sendError( 'This function is currently unavailable', res );
        })
    }
);

//delete User
    router.delete('/:id', (req, res) => {
        //set id
        const ID = req.params.id
        //delete the user
        Users
        .remove(ID)
        .then( user => { 
        if (user === undefined) {
            return sendMissing(res);
        }
        else{
            return res.status(200).json(user);
        }
        })
        .catch( err => {
        return sendError( 'This function is currently unavailable', res );
        })

    }
);

module.exports = router;