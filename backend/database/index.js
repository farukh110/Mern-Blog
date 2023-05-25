const mongoose = require('mongoose');
const { MONGODB_CONNECTION_STRING } = require('../config/index');

// const connectionString = "mongodb+srv://oansajjad110:T9MA7yNPWwSZVNGx@cluster1.yckfaa8.mongodb.net/mern-blog?retryWrites=true&w=majority";

const dbConnect = async () => {

    try {

        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(MONGODB_CONNECTION_STRING);

        console.log(`Database connected to host: ${connect.connection.host}`);

    } catch (error) {

        console.log(`Error: ${error}`);
    }
}

module.exports = dbConnect;
