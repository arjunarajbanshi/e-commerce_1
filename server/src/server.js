process.loadEnvFile(); /* Node.js include built-in support for .env files */
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { v2 as cloudinary } from 'cloudinary';

connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// handle uncaught exception errors
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to uncaught exception errors`);

    process.exit(1);
})

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`);

    server.close(() => process.exit(1))
})