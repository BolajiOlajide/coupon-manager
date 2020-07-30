// @ts-check

const { getAllCoupons, getUserCoupons, addCoupon, getCoupon, editCoupon, deleteCoupon } = require('./services/coupon');
const { getAllUsers, getUserByNameAndPassword, addUser, getUser } = require('./services/user');

module.exports = {
  Query: {
    async fetchCoupons(_, { userId }) {
      let coupons = [];

      if (!userId) {
        coupons = await getAllCoupons();
      } else {
        coupons = await getUserCoupons(userId);
      }

      return coupons;
    },
    async fetchCoupon(_, { id }) {
      const coupon = await getCoupon(id);

      if (coupon) return coupon;
      throw new Error('Coupon not found');
    },
    fetchNonSecureUsers: async () => await getAllUsers(),
  },
  Mutation: {
    async signin(_, { name, password }) {
      const user = await getUserByNameAndPassword(name, password);

      if (user) return user;
      throw new Error('User not found.')
    },
    async deleteCoupon(_, { id, userId }) {
      await deleteCoupon(id, userId);
      return true;
    },
    signup: async (_, { name, password }) => await addUser(name, password),
    addCoupon: async (_, { userId, couponCode, expiry }) => await addCoupon(couponCode, expiry, userId),
    editCoupon: async (_, { id, userId, couponCode, expiry }) => await editCoupon(id, couponCode, expiry, userId)
  },
  Coupon: {
    owner: (parent) => getUser(parent.ownerId)
  }
}