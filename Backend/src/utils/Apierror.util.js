class Apierror extends Error {
    constructor(statusCode,message, error = [], stack = ""){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.error = error,
        this.data = null,
        this.success = false,
        this.stack = stack

        if (stack) {
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {Apierror}