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

//get users post data
    router.get('/:id/posts', validateUserId, (req, res) => {
        //define id
        const ID = req.params.id 
        Users
            .getUserPosts(ID)
            .then( user => {
                if (user.length == 0) {
                    return sendMissing(res);
                }
                else{
                    return res.status(200).json(user);
                }
            }) 
            .catch( err => {
                return sendError( 'User information is Unavailable at this time', res );
            })
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

//adding a post to user
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    req.body.user_id = req.user.id;
    console.log(req.body.user_id);
    Posts.insert(req.body)
        .then(post => {
            console.log(post);
            res.status(200).json({
                message: 'Post created.'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Database error. Post was not created.'
            })
        })
});

//update user
    router.put('/:id', validateUserId, validateUser, (req, res) => {
        //define id 
        const ID = req.params.id
    
        //define req.body
        const { name } = req.body;
        const user = { name };
    
        //check the req body
        if(!name) { 
        return res.status(400).json({ error: 'Please provide the NEW user name' });
        }
        Users
        .update(ID, user)
        .then( person => {
        if (person === undefined) {
            return sendMissing(res);
        }
        else{
            newUser = { ID, name }
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
            if (req.body.name) {
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
//////////////////////////////////////////ValidatePost/////////////////////////////////////////////////
function validatePost(req, res, next) {
        if (req.body) {
            if (req.body.text) {
                next();
            }
            else {
                res.status(400).json({
                    message: 'Missing required text field in req.body'
                });
            }
         }
        else {
            res.status(400).json({
                message: 'Missing post data in req.body'
            });
         }
};


module.exports = router;