const mongoose = require('mongoose');

// Mongoose Config

mongoose.connect('mongodb://localhost:27017/blog', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully to Blog");
}).catch(err => {
    console.log("Some error occured", err);
});
