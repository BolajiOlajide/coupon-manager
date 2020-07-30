const { hashSync, compareSync } = require('bcryptjs');
const { salt_length } = require('./config');

const { UNIQUE_CONSTRAINT_ERROR, FOREIGN_KEY_CONSTRAINT_ERROR, GENERIC_ERROR } = require("./constants").DB_ERRORS;

const hashPassword = (password) => hashSync(password, salt_length);
const comparePassword = (password, hash) => compareSync(password, hash);

function getErrorType(error) {
    if (error.code && error.code.includes('SQLITE')) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            if (error.message.includes('FOREIGN KEY')) {
                return FOREIGN_KEY_CONSTRAINT_ERROR;
            }

            if (error.message.includes('UNIQUE')) {
                return UNIQUE_CONSTRAINT_ERROR;
            }
        } else {
            return GENERIC_ERROR;
        }
    } else {
        return 'Error';
    }
}

function handleError(error, entity, foreignKey = null) {
    switch (getErrorType(error)) {
        case UNIQUE_CONSTRAINT_ERROR:
            throw new Error(`${entity} already exists`);
        case FOREIGN_KEY_CONSTRAINT_ERROR:
            throw new Error(foreignKey ? `${foreignKey} not found` : 'Foreign key does not exist');
        case GENERIC_ERROR:
            throw new Error(`An error occurred. Please try again.`);
        default:
            throw error;
    }
}

module.exports = {
    handleError,
    hashPassword,
    comparePassword
};