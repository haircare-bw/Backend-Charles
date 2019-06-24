//import express
const express = require('express');

//import database
const stylist = require('../models/stylistDb.js');

//define the Router
const router = express();

//make a constant reply for 404 and 500
const sendErr = (msg, res) => {
    res.status(500).json( { errorMessage: `${msg}` })
};
const sendMissingID = (res) => {
    res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
};

//make CRUD endpoints
//get request
router.get('/', (req, res) => {
    stylist
    .get()
    .then( post => {
        res.status(200).json(post);
    })
    .catch( err => {
        return sendErr( 'Post information is unavailable at this time', res );
    })
});

//get post by ID
router.get('/:id', (req, res) => {
    const ID = req.params.id;
    stylist
    .getById(ID)
    .then( post => {
        if( post === undefined ) {
            return sendMissingID(res);
        }
        else{
            return res.status(200).json(post);
        }
    })
    .catch( err => {
        return sendErr( 'Post information is unavailable at this time', res );
    })
});

//delete post 
router.delete('/:id', (req, res) => {
    //set id
    const ID = req.params.id
    //delete the post
    stylist
    .remove(ID)
    .then( post => { 
      if (post === undefined) {
        return sendMissingID(res);
      }
      else{
        return res.status(200).json(post);
      }
    })
    .catch( err => {
      return sendError( 'This function is currently unavailable', res );
    })
})

//update post
router.put('/:id', (req, res) => {
    //define id 
    const ID = req.params.id
  
    //define req.body
    const { text, user_id } = req.body;
    const posted = { text, user_id };
  
    //check the req body
    if(!text || !user_id) { 
      return res.status(400).json({ error: 'Please provide the NEW post text' });
    }
    stylist
    .update(ID, posted)
    .then( post => {
      console.log(post)
      if (post === 0) {
        return sendMissingID(res);
      }
      else{
        newPost = { ID, text, user_id }
        return res.status(201).json(newPost);
      }
    })
    .catch( err => {
      return sendError( 'This function is currently unavailable', res );
    })
})

//new post
router.post('/', (req, res) => {
    //define req.body
    const { text, user_id } = req.body;
    const posted = { text, user_id };
  
    //check the req body
    if(!text || !user_id) { 
      return res.status(400).json({ error: 'Please provide the NEW post text' });
    }
    stylist
    .insert(posted)
    .then( post => {
      res.status(200).json(post);
    })
    .catch( err => {
      console.log(err)
      return sendError( 'This function is currently unavailable', res );
    })
})

// custom middleware

// function validatePostId(req, res, next) {

// };


//export
module.exports = router;