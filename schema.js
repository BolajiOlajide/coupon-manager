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
    expiry: Int!
    owner: AuthenticatedUser!
  }

  type Query {
    fetchUserCoupon(userId: ID!): [Coupon]!
    fetchNonSecureUsers: [User]!
  }

  type Mutation {
    signin(name: String!, password: String!): AuthenticatedUser!
    signup(name: String!, password: String!): AuthenticatedUser!
    addCoupon(userId: ID!, couponCode: String!, expiry: String): Coupon!
  }
`;