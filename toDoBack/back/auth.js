const express = require('express');
const Users = require('../models/users')
const bcrypt = require('bcrypt'); // We install this library to help us to encrypt our Password.
const jwt = require('jsonwebtoken'); // We install this library to generate a Token for our page.
const router = express.Router();

router.post('/register', (req, res) => {
    Users.find({email: req.body.email})
    .then(async result => {
        if (JSON.stringify(result) == "[]") {
            let body = req.body;
            const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT));
            const password = await bcrypt.hash(body.password, salt);
            body = {
                ...body,
                password: password
            };
            const user = new Users(body);
            user.save()
            .then(user => res.json({message: true}))
            .catch(error => res.json(error));
        } else {
            res.json({message: false});
        }
    })
    .catch(error => res.json("Error Find: ", error));
})


router.post('/login', async (req, res) => {
    const user = req.body;

    Users.findOne({email: user.email})
    .then(result => 
        { if (result != null) {
            bcrypt.compare(user.password, result.password)
            .then(comp => {
                if (comp) {
                    const token = jwt.sign({
                            id: result._id
                        }, process.env.SECRET_TOKEN, {expiresIn : "10 year"});
                    
                    res.header('auth-token', token)
                    .json({"message": comp});
                } else {
                    res.json({"message": comp})
                }
            })
            .catch(error => res.json({"message": error}))
        } else {
            res.json({"message": false})
        }
    })
    .catch(error => res.json({message: error}));

})

router.post('/checktoken', (req, res) => {
    const token = req.body.token;
    try {
        const response = jwt.verify(token, process.env.SECRET_TOKEN);
        res.json({message: response.id});
    } catch {
        res.json({message: false});
    }
})


module.exports = router;