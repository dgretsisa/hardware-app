const { GeneralError, ValidationError } = require('./error.class');

const errorHandler = (err, req, res, next) => {

    if(err instanceof GeneralError) {

        /** Validation Error */
        if(err instanceof ValidationError) {
            return res.status(err.getCode()).json({
                status: 'error',
                title: 'Validation Error',
                message: err.message,
                errors: err.getErrors()
            });
        }

        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    });
}

module.exports = errorHandler;