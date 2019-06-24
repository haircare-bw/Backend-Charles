//import express
const express = require('express');

//import database
const Users = require('../models/userDb.js');
// const Posts = require('../data/Helpers/postDb');

//define the Router
const router = express.Router();

//make a constant reply for 404 & 500
const sendError = (msg, res) => {
    res.status(500).json({ errorMessage: `${msg}` })
};

const sendMissing = (res) => {
    res.status(404).json({ errorMessage: 'The User does not exist.' });
}

//////////////////////////////////////////////////////////MAKE CRUD ENDPOINTS///////////////////////////////////
//get requests all users
    router.get('/', (req, res) => {
        Users
        .get()
        .then( user => {
        res.status(200).json(user);
        })
        .catch( err => {
        return sendError( 'User information Unavailable at this moment', res );
        })
    }
);

//get user by id 
    router.get('/:id', validateUserId, (req, res) => {
        res.status(200).json(req.user)  
    }
);

//NEW USER using post
router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
        .then(user => {
            //console.log(user);
            res.status(200).json({
                message: 'User created, congratz!!!'
            });
        })
        .catch(error => {
            //console.log(error);
            res.status(500).json({
                message: 'Error creating the user within the post command.'
            });
        })
    }
);

//update user
    router.put('/:id', validateUserId, validateUser, (req, res) => {
        //define id 
        const ID = req.params.id
    
        //define req.body
        const { username, password } = req.body;
        const user = { username, password };
    
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
            newUser = { ID, username, password }
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



//////////////////////////////////////////CUSTOM MIDDLEWARE//////////////////////////////////////////////
//////////////////////////////////////////ValidateUserId/////////////////////////////////////////////////
function validateUserId(req, res, next) {
    const ID = req.params.id
       Users
       .getById(ID)
       .then( user => {
        if (user) {
            req.user = user
            next()
        } else {
            res.status(400).json({ message: 'invalid user id' })
        }
       })
       .catch(err => {
           res.status(500).json({err})
       }) 
};
//////////////////////////////////////////ValidateUser/////////////////////////////////////////////////
function validateUser(req, res, next) {
        if (req.body) {
            if (req.body.username) {
                next();
            }
            else {
                res.status(400).json({
                    message: 'Missing required name field.'
                });
            }
        }
        else {
            res.status(400).json({message: 'Missing user data.'});
        }
};

module.exports = router;