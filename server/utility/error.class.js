class GeneralError extends Error {

    constructor(message) {
        super();
        this.message = message;
    }

    getCode() {
        if(this instanceof ValidationError) {
            return 422;
        }

        if(this instanceof UnauthorizedError) {
            return 403;
        }

        return 500;
    }
}

class ValidationError extends GeneralError {

    constructor(message, errors) {
        super();
        this.message = message;
        this.errors = errors;
    }

    getErrors() {
        return this.errors;
    }
}

class UnauthorizedError extends GeneralError {

    constructor(message) {
        super();
        this.message = message;
    }
}

module.exports = { GeneralError, ValidationError, UnauthorizedError };
