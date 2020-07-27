// @ts-check

const { getAllCoupons, getUserCoupons, getCouponByUserAndCode, addCoupon } = require('./services/coupon');
const { getAllUsers, getUserByName, getUserByNameAndPassword, addUser, getUser } = require('./services/user');

module.exports = {
  Query: {
    fetchUserCoupon: (_, args) => {
      const { userId } = args;
      const couponsToReturn = [];

      if (!userId) {
        couponsToReturn.push(...getAllCoupons());
      } else {
        couponsToReturn.push(...getUserCoupons(userId));
      }

      return couponsToReturn;
    },
    fetchNonSecureUsers: () => getAllUsers()
  },
  Mutation: {
    signin(_, args) {
      const { name, password } = args;
      const currentUser = getUserByNameAndPassword(name, password);

      if (currentUser) return currentUser;
      throw new Error('User not found.')
    },
    signup(_, args) {
      const { name, password } = args;
      const existingUser = getUserByName(name);

      if (existingUser) throw new Error('User already exists');

      const user = addUser(name, password);

      return user;
    },
    addCoupon(_, args) {
      const { userId, couponCode: code, expiry } = args;
      const user = getUser(userId);

      if (!user) throw new Error('User not found')

      const existingCoupon = getCouponByUserAndCode(userId, code);

      if (existingCoupon) throw new Error('Coupon already exists for this user');

      const coupon = addCoupon(code, expiry, userId);

      return coupon;
    }
  },
  Coupon: {
    owner: (parent) => getUser(parent.userId)
  }
}