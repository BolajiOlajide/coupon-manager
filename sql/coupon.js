const INSERT_COUPON = 'INSERT INTO coupon (code, expiry, ownerId) VALUES (?, ?, ?)';
const SELECT_COUPONS = 'SELECT * FROM coupon';
const SELECT_COUPON = 'SELECT * FROM coupon WHERE id = ?';
const SELECT_COUPONS_BY_OWNER = 'SELECT * FROM coupon WHERE ownerId = ?';
const SELECT_COUPONS_BY_ID_OWNER = 'SELECT * FROM coupon WHERE id = ? AND ownerId = ?';
const SELECT_COUPON_BY_OWNER_CODE = 'SELECT * FROM coupon WHERE ownerId = ? AND code = ?';
const DELETE_COUPON = 'DELETE FROM coupon WHERE id = ? AND ownerId = ?';
const UPDATE_COUPON = `
UPDATE coupon
SET code = ?,
    expiry = ?
WHERE id = ?
AND ownerId = ?
`;

module.exports = {
    INSERT_COUPON,
    SELECT_COUPONS,
    SELECT_COUPON,
    SELECT_COUPONS_BY_OWNER,
    SELECT_COUPON_BY_OWNER_CODE,
    SELECT_COUPONS_BY_ID_OWNER,
    DELETE_COUPON,
    UPDATE_COUPON
};