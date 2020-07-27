// @ts-check

const { users } = require("../data");

const getAllUsers = () => users;
const getUserByName = (name) => users.find(user => user.name === name);
const getUserByNameAndPassword = (name, password) => users.find(user => user.name === name && user.password === password);
const getUser = (id) => users.find(user => user.id == id);

function addUser(name, password) {
    const existingUser = getUserByName(name);
    if (existingUser) throw new Error('User already exists');

    const id = users[users.length - 1].id + 1;
    const user = { id, name, password };

    users.push(user);
    return user;
}

module.exports = {
    getAllUsers,
    getUserByNameAndPassword,
    getUser,
    addUser
};