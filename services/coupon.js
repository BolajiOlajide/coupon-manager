// @ts-check

const { coupons } = require("../data");
const { getUser } = require("./user");

const getCouponIndex = (id) => coupons.findIndex(coupon => coupon.id == id);

const getAllCoupons = () => coupons;
const getCoupon = (id) => coupons.find(coupon => coupon.id == id);
const getUserCoupons = (userId) => coupons.filter(coupon => coupon.userId == userId);
const getCouponByUserAndCode = (userId, code) => coupons.find(coupon => coupon.code === code && coupon.userId == userId);

function addCoupon(code, expiry, userId) {
    const user = getUser(userId);

    if (!user) throw new Error('User not found')

    const existingCoupon = getCouponByUserAndCode(userId, code);

    if (existingCoupon) throw new Error('Coupon already exists for this user');
    
    const id = coupons[coupons.length - 1].id + 1;
    const coupon = { id, code, expiry, userId: Number(userId) };

    coupons.push(coupon);

    return coupon;
}

function editCoupon(id, code, expiry, userId) {
    let coupon = getCoupon(id);

    if (!coupon) throw new Error('Coupon not found');
    if (coupon.userId != userId) throw new Error('Access forbidden');

    coupon = { id, code, expiry, userId: Number(userId) };
    
    const couponIndex = getCouponIndex(id);

    if (!(couponIndex > -1)) throw new Error('An error occurred. Please try again');
    coupons.splice(couponIndex, 1, coupon);

    return coupon;
}

function deleteCoupon(id, userId) {
    const coupon = getCoupon(id);

    if (!coupon) throw new Error('Coupon not found');
    if (coupon.userId != userId) throw new Error('Access forbidden');

    const couponIndex = getCouponIndex(id);

    if (!(couponIndex > -1)) throw new Error('An error occurred. Please try again');
    coupons.splice(couponIndex, 1);

    return coupon;
}


module.exports = {
    getAllCoupons,
    getUserCoupons,
    getCouponByUserAndCode,
    addCoupon,
    getCoupon,
    editCoupon,
    deleteCoupon
};