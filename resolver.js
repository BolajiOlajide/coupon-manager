const data = require('./data');

module.exports = {
  Query: {
    fetchUserCoupon: (_, args) => {
      const { userId } = args;
      const couponsToReturn = [];
      if (!userId) {
        couponsToReturn.push(...data.coupons);
      } else {
        couponsToReturn.push(...data.coupons.filter(coupon => coupon.userId == userId));
      }

      return couponsToReturn.map(coupon => {
        return {
          ...coupon,
          owner: data.users.find(user => user.id == coupon.userId)
        }
      })
    },
    fetchNonSecureUsers: () => { }
  },
  Mutation: {
    signin(_, args) {
      const { name, password } = args;
      const currentUser = data.users.find(user => user.name === name && user.password === password);

      if (currentUser) return currentUser;
      throw new Error('User not found.')
    },
    signup(_, args) {
      const { name, password } = args;

      const existingUser = data.users.find(user => user.name === name);

      if (existingUser) throw new Error('User already exists');

      const newUserId = data.users[data.users.length - 1].id + 1;
      const newUser = { id: newUserId, name, password };

      data.users.push(newUser);

      return newUser;
    }
  }
}