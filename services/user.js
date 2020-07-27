// @ts-check

const data = require("../data");

const getAllUsers = () => data.users;
const getUserByName = (name) => data.users.find(user => user.name === name);
const getUserByNameAndPassword = (name, password) => data.users.find(user => user.name === name && user.password === password);
const getUser = (id) => data.users.find(user => user.id == id);

function addUser(name, password) {
    const id = data.users[data.users.length - 1].id + 1;
    const user = { id, name, password };

    data.users.push(user);
    return user;
}

module.exports = {
    getAllUsers,
    getUserByName,
    getUserByNameAndPassword,
    getUser,
    addUser
};