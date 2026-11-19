import errorHandler from "../utils/errorHandler.js";

function errorHandlerMiddleware(err, req, res, next) {
    console.log(err);

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    /* casterror */
    if (err.name === 'CastError') {
        const message = `This is invalid resource ${err.path}`;
        err = new errorHandler(404, message)
    }

    /* Duplicate key error: E11000 */
    if (err.code === 11000) {
        const message = `This ${Object.keys(err.keyValue)} already registered. Please login to continue.`
        
        // Object.keys(err.keyValue) = fieldName

        err = new errorHandler(409, message)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default errorHandlerMiddleware;

/* working🤔

router.route("/endPoint").get(doSomething)
    - when endpoint is hit, doSomething will be called.

    - In doSomething, in try block inside next() errorHandler classs will be initialized to send custom error message when needed.

    - if try block promise gets rejected then catch block will catch that error and call the next() by passing error catched by it.

    - Now this(errorHandlerMiddleware) will catch that error from next() and throw error according what it receives in err object got from errorHandler()
        - if errorHandler(404, "not found") then 
            res.status(404).json({
                success: false,
                message: "not found"
            })

        - from catch() block will show fallback code and message(according to err.message)
*/


