// @ts-check

const data = require("../data");

const getAllCoupons = () => data.coupons;
const getUserCoupons = (userId) => data.coupons.filter(coupon => coupon.userId == userId);
const getCouponByUserAndCode = (userId, code) => data.coupons.find(coupon => coupon.code === code && coupon.userId == userId);

function addCoupon(code, expiry, userId) {
    const id = data.coupons[data.coupons.length - 1].id + 1;
    const coupon = { id, code, expiry, userId: Number(userId) };

    data.coupons.push(coupon);

    return coupon;
}

module.exports = {
    getAllCoupons,
    getUserCoupons,
    getCouponByUserAndCode,
    addCoupon
};