//import express
const express = require('express');

//import database
const Users = require('../models/userDb.js');
const restricted = require('../middleware/restricted.js');
const checked = require('../middleware/checkRole.js')

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
//get requests all stylists
router.get('/', restricted, async (req, res) => {
    try{
        const users = await Users.get();
        res.status(200).json({users});
    }
    catch( err ) {
        return sendError('Something went wrong', res)  
      };
});

//get requests all users
router.get('/all', restricted, async (req, res) => {
    try{
        const all = await Users.getAllUsers();
        res.status(200).json({all});
    }
    catch( err ) { res.send(err) }
});


//get user by id 
router.get('/:id', restricted, async (req, res) => {
    try{
            const ID = req.params.id;
    
            const stylist = await Users.getById(ID); 
            // console.log('stylists', stylist);
            stylist.portfolio = await Users.getPortfolioById(ID);
            // console.log('portfolio', portfolio);
            stylist.posts = await Users.getPostsById(ID);
            // console.log('posts', posts);
            
            return res.status(200).json({stylist});
            } 
            catch(error){
            res.status(500).json({message: 'stylist information is unavailable at this time'});
        }
});    

//NEW Post using post
router.post('/posts', restricted, checked, (req, res) => {
    //define id
    //  const ID = req.params.id

    //define req.body
    const { title, posts_image, description, stylists_id} = req.body;
    
    const post = { title, posts_image, description, stylists_id};

    //check the req.body
    if(!title && !posts_image ) { 
        return res.status(400).json({ error: 'Please provide the NEW posts title and image.' });
        }
    Users
        .insert(post)
        .then(post => {
            
            if (post === undefined) {
                return sendMissing(res);
            }
            else{
                console.log(post);
                post = { stylists_id, title, posts_image, description }
                res.status(200).json({
                message: 'Post created, congratulations!!!'
            });
        }
        })
        .catch(err => {
        console.log(err);
            res.status(500).json({
                message: 'Error creating the Post within the post command.', err
            });
        })
    }
);

//update user
router.put('/:id', restricted, checked, (req, res) => {
        //define id 
        const ID = req.params.id
    
        //define req.body
        const { email, password, stylist } = req.body;
        const user = { email, password, stylist};
    
        //check the req body
        if(!email || !password ) { 
        return res.status(400).json({ error: 'Please provide the NEW user name or password' });
        }
        Users
        .update(ID, user)
        .then( person => {
        if (person === undefined) {
            return sendMissing(res);
        }
        else{
            newUser = { ID, username, password, stylist }
            return res.status(201).json({message: 'Update was Successful', newUser});
        }
        })
        .catch( err => {
        return sendError( 'This function is currently unavailable', res );
        })
    }
);

//update post
router.put('/:id/posts', restricted, checked, (req, res) => {
    //define id
    const ID = req.params.id

    //define req.body
    const { title, posts_image, description } = req.body;
    const post = { title, posts_image, description};

    //check the req.body
    if(!title || !posts_image || !description) { 
        return res.status(400).json({ error: "Please provide the post's title, image, or description to update." });
        }
    Users
        .updatePost(ID, post)
        .then(post => {
            if (post === undefined) {
                return sendMissing(res);
            }
            else{
                post = { ID, title, posts_image, description }
                res.status(200).json({
                message: 'Post Successfully Updated, congratulations!!!'
            });
        }
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({
                message: 'Error updating the Post within the post command.', err
            });
        })
    }
);

//delete User
router.delete('/:id', restricted, checked, (req, res) => {
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
            return res.status(200).json({ message: 'User account removed successfully'});
        }
        })
        .catch( err => {
        return sendError( 'This function is currently unavailable', res );
        })

    }
);

//delete post
router.delete('/:id/posts', restricted, checked, (req, res) => {
    //set id
    const ID = req.params.id
    //delete the user
    Users
    .removePost(ID)
    .then( post => { 
    if (post === undefined) {
        return sendMissing(res);
    }
    else{
        return res.status(200).json({ message: 'User post removed successfully'});
    }
    })
    .catch( err => {
    return sendError( 'This function is currently unavailable', res );
    })

}
);

module.exports = router;