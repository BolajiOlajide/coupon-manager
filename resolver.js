// @ts-check

const { getAllCoupons, getUserCoupons, addCoupon, getCoupon, editCoupon, deleteCoupon } = require('./services/coupon');
const { getAllUsers, getUserByNameAndPassword, addUser, getUser } = require('./services/user');

module.exports = {
  Query: {
    fetchUserCoupon(_, args) {
      const { userId } = args;
      const couponsToReturn = [];

      if (!userId) {
        couponsToReturn.push(...getAllCoupons());
      } else {
        couponsToReturn.push(...getUserCoupons(userId));
      }

      return couponsToReturn;
    },
    fetchCoupon(_, args) {
      const { id } = args;

      const coupon = getCoupon(id);

      if (coupon) return coupon;
      throw new Error('Coupon not found');
    },
    fetchNonSecureUsers: () => getAllUsers(),
  },
  Mutation: {
    signin(_, args) {
      const { name, password } = args;
      const user = getUserByNameAndPassword(name, password);

      if (user) return user;
      throw new Error('User not found.')
    },
    signup(_, args) {
      const { name, password } = args;
      const user = addUser(name, password);

      return user;
    },
    addCoupon(_, args) {
      const { userId, couponCode, expiry } = args;
      const coupon = addCoupon(couponCode, expiry, userId);

      return coupon;
    },
    editCoupon(_, args) {
      const { id, userId, couponCode, expiry } = args;
      const coupon = editCoupon(id, couponCode, expiry, userId);

      return coupon;
    },
    deleteCoupon(_, args) {
      const { id, userId } = args;
      const coupon = deleteCoupon(id, userId);

      return coupon;
    }
  },
  Coupon: {
    owner: (parent) => getUser(parent.userId)
  }
}