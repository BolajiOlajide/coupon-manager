// @ts-check

const { all, get, run } = require("../db");
const { handleError } = require("../utils");
const { SELECT_COUPONS, SELECT_COUPON, SELECT_COUPONS_BY_OWNER, SELECT_COUPON_BY_OWNER_CODE, INSERT_COUPON, UPDATE_COUPON, DELETE_COUPON, SELECT_COUPONS_BY_ID_OWNER } = require('../sql/coupon');

const [entity, foreignKey] = ['Coupon', 'Owner'];

async function getAllCoupons() {
    try {
        return await all(SELECT_COUPONS);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
}

async function getCoupon(id) {
    try {
        return await get(SELECT_COUPON, [id]);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
}

async function getUserCoupons(userId) {
    try {
        return await all(SELECT_COUPONS_BY_OWNER, [userId]);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
}

async function getCouponByUserAndCode(userId, code) {
    try {
        return await get(SELECT_COUPON_BY_OWNER_CODE, [userId, code]);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
}

async function getCouponByIdAndUser(id, userId) {
    try {
        return await get(SELECT_COUPONS_BY_ID_OWNER, [id, userId]);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
}

async function addCoupon(code, expiry, userId) {
    try {
        const existingCoupon = await getCouponByUserAndCode(userId, code);

        if (existingCoupon) throw new Error('Coupon already exists');

        await run(INSERT_COUPON, [code, expiry, userId]);
        return await get(SELECT_COUPON_BY_OWNER_CODE, [userId, code]);
    } catch (error) {
        handleError(error, entity, foreignKey);
    }
}

async function editCoupon(id, code, expiry, userId) {
    try {
        const coupon = await getCouponByIdAndUser(id, userId);

        if (!coupon) throw new Error('Coupon not found');

        await run(UPDATE_COUPON, [code, expiry, id, userId]);
        return await get(SELECT_COUPON, [id]);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
}

async function deleteCoupon(id, userId) {
    try {
        const coupon = await getCouponByIdAndUser(id, userId);

        if (!coupon) throw new Error('Coupon not found');

        return await run(DELETE_COUPON, [id, userId]);
    } catch(error) {
        handleError(error, entity, foreignKey);
    }
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