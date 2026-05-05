const mongoose = require('mongoose');

async function connect() 
{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/project");
        console.log('Connected to Database');

    }   
    catch(err)
    {
        console.error(err);
    }
}

module.exports = connect;
