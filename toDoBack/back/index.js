const express = require('express');
const Users = require('../models/users');
const router = express.Router();

// Index Page
router.get('/', (req, res) => {
    res.json({message: "Welcome to this BackEndPage!"}) 
})


module.exports = router;