//import express
const express = require('express');

//import database
const Stylists = require('../models/stylistDb.js');
const restricted = require('../middleware/restricted.js');

//define the Router
const router = express.Router();

//make a constant reply for 404 and 500
const sendErr = (msg, res) => {
    res.status(500).json( { errorMessage: `${msg}` })
};
const sendMissingID = (res) => {
    res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
};

//make CRUD endpoints
//get request
router.get('/', restricted, (req, res) => {
    Stylists
    .get()
    .then( stylist => {
        res.status(200).json(stylist);
    })
    .catch( err => {
        return sendErr( 'stylist information is unavailable at this time', res );
    })
});

//get stylist by ID
router.get('/:id', restricted, (req, res) => {
    const ID = req.params.id;
    Stylists
    .getById(ID)
    .then( stylist => {
        if( stylist === undefined ) {
            return sendMissingID(res);
        }
        else{
            return res.status(200).json(stylist);
        }
    })
    .catch( err => {
        return sendErr( 'stylist information is unavailable at this time', res );
    })
});

//new stylist
router.post('/', restricted, (req, res) => {
    Stylists
    .insert(req.body)
    .then( stylist => {
      console.log(stylist);
      res.status(200).json({
        message: 'Stylist created, congratz!!!'
      });
    })
    .catch( err => {
      //console.log(err)
      return sendErr( 'This function is currently unavailable', res );
    })
})

//update stylist
router.put('/:id', restricted, (req, res) => {
    //define id 
    const ID = req.params.id
  
    //define req.body
    const { username, password, type, about, skills } = req.body;
    const stylist = { username, password, type, about, skills };
  
    //check the req body
    if(!username || !password || !about) { 
      return res.status(400).json({ error: 'Please provide the NEW stylist name, password, about section' });
    }
    Stylists
    .update(ID, stylist)
    .then( stylist => {
      //console.log(stylist)
      if (stylist === undefined) {
        return sendMissing(res);
      }
      else{
        newStylist = { ID, username, password, type, about, skills }
        return res.status(201).json(newStylist);
      }
    })
    .catch( err => {
      return sendError( 'This function is currently unavailable', res );
    })
})

//delete stylist 
router.delete('/:id', restricted, (req, res) => {
    //set id
    const ID = req.params.id
    //delete the post
    Stylists
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

//export
module.exports = router;