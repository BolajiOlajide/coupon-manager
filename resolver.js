const data = require('./data');

module.exports = {
  Query: {
    fetchUserCoupon: () => {},
    fetchNonSecureUsers: () => {}
  },
  Mutation: {
    signin(_, args) {
      const { name, password } = args;
      const currentUser = data.users.find(user => user.name === name && user.password === password);

      if (currentUser) return currentUser;
      throw new Error('User not found.')
    }
  }
}