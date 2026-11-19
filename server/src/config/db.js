import mongoose from "mongoose";

export async function connectDB() {
    const url = process.env.MONGO_LOCAL_URL;

    if (!url) return console.log('MongoDB connection string is missing or invalid!');

    // if (!url) throw new Error('MongoDB connection string is missing or invalid!');

    mongoose.connect(url)
        .then((data) => console.log(`Database connected with server ${data.connection.host} ✅`))
}

// catch is handled using unhandledRejection