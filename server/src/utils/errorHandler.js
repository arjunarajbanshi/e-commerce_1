class errorHandler extends Error {
    constructor(statuscode, message) {
        super(message); // Parent class property
        this.statusCode = statuscode;
        Error.captureStackTrace(this, this.constructor)
    }
}

export default errorHandler;

/* Why need this?
- This custom errorHandler class is used in Node.js/Express applications to standardise error handling across your entire API.

- Instead of creating generic JavaScript errors and manually setting status codes everywhere, this class lets you throw or pass custom errors that bundle what went wrong (message) and the HTTP response code (status code) together in a single object.
*/

/* How this works?
- extend let inherit parent properties and methods

- Pass statusCode and message as args when creating new instance of errorHandler class

- super is used when child class want's to use parent property

- this represent instances/object made from errorHandler class. so this.message means message belongs to that object who initialized the class.
*/