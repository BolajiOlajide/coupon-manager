module.exports = `
  type User {
    id: ID!
    name: String!
    password: String!
  }

  type AuthenticatedUser {
    id: ID!
    name: String!
  }

  type Coupon {
    id: ID!
    code: String!
    expiry: Float!
    owner: AuthenticatedUser!
  }

  type Query {
    fetchCoupons(userId: ID): [Coupon]!
    fetchCoupon(id: ID!): Coupon!
    fetchNonSecureUsers: [User]!
  }

  type Mutation {
    signin(name: String!, password: String!): AuthenticatedUser!
    signup(name: String!, password: String!): AuthenticatedUser!
    addCoupon(userId: ID!, couponCode: String!, expiry: Float!): Coupon!
    editCoupon(id: ID!, userId: ID!, couponCode: String!, expiry: Float!): Coupon!
    deleteCoupon(id: ID!, userId: ID!): Boolean!
  }
`;