// This file is the manipulator of routes.

const express = require('express');
const Users = require('../models/users');
const router = express.Router();

// Get all the users saved
router.get('/getall', async (req, res) => {
    const docs_users = await Users.find();
    res.send(docs_users) 
})

// Create users
router.post('/usersignup', (req, res) => {
    console.log(req.body);
    const user = new Users(req.body);
    user.save()
    .then(result => res.json(result))
    .catch(error => res.json(error));
})

// Get one specific user: 
router.get('/getone/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
    .then(user => res.json(user))
    .catch(error => res.json(error))
    /*try {
        const user = await Users.findById(id);
        res.json(user ? user : "");
    } catch (error) {
        res.json({message: error})
    }*/
    
})

router.put('/getone/update/:id', (req, res) => {
    const userId = req.params.id;
    const user = req.body; // We can send a body with a JSON only specifying the parameters we want to update and it will still work. 

    Users.updateOne(
        {_id: userId}, { $set: user}
    )
    .then(result => res.json(result))
    .catch(error => res.json({message: error}))

})

router.delete('/getone/delete/:id', (req, res) => { 
    const userId = req.params.id;
    
    Users.deleteOne( {_id: userId} ) //You can also use .rb emove
    .then(result => res.json(result))
    .catch(error => res.json({message: error}))
})


module.exports = router;