const DataLoader = require('dataloader');

const { selectUserInIDArray } = require('../services/user');


module.exports = new DataLoader(async keys => {
  const users = await selectUserInIDArray(keys);

  const userMap = {};
  users.forEach(user => userMap[user.id] = user);

  return keys.map(key => userMap[key]);
});
