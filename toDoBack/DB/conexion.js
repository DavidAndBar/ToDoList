const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.user;
const password = process.env.password;
const databaseName = process.env.databaseName;
const uri = `mongodb+srv://${username}:${password}@cluster.hjyp6wt.mongodb.net/${databaseName}?retryWrites=true&w=majority`;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}) // useNew... and useUni... are optional parameters, 
                                                                        // connection still works without them
.then( () => {
    console.log("DB connected")
} )
.catch( (error) => console.log("error"));