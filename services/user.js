// @ts-check

const { all, get, run } = require("../db");
const { SELECT_USERS, SELECT_USER_BY_NAME, SELECT_USER_BY_ID, INSERT_USER } = require("../sql/user");
const { handleError, hashPassword, comparePassword } = require("../utils");
const entity = 'User';

async function getAllUsers() {
    try {
        return await all(SELECT_USERS);
    } catch(error) {
        handleError(error, entity);
    }
}

async function getUserByName(name) {
    try {
        return await get(SELECT_USER_BY_NAME, [name]);
    } catch(error) {
        handleError(error, entity);
    }
}

async function getUserByNameAndPassword(name, password) {
    try {
        const user = await getUserByName(name);
        
        if (!user) return null;
        if (!comparePassword(password, user.password)) return null;

        return user;
    } catch(error) {
        handleError(error, entity);
    }
}

async function getUser(id) {
    try {
        return await get(SELECT_USER_BY_ID, [id]);
    } catch(error) {
        handleError(error, entity);
    }
}

async function addUser(name, password) {
    try {
        await run(INSERT_USER, [name, hashPassword(password)]);
        return await getUserByName(name);
    } catch (error) {
        handleError(error, entity);
    }
}

module.exports = {
    getAllUsers,
    getUserByNameAndPassword,
    getUser,
    addUser
};