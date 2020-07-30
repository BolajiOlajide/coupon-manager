const { config } = require('dotenv');

config();

module.exports = {
    salt_length: Number(process.env.SALT_LENGTH) || 10
};