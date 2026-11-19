import express from 'express';
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import errorHandlerMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express()

/* Middlware */
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

/* Routes */
app.use('/api/v1/', productRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)

// Global Error Middleware MUST be placed LAST
app.use(errorHandlerMiddleware)

export default app;