const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    savedBooks: [bookSchema]
  }

  type Auth {
    token: ID
    user: User
  }

  type bookSchema {
    description: String
    bookId: String
    title: String
    authors: [String]
    image: String
  }

  type Query {
    users: [User]
    user(_id: ID, username: String): User
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      _id: ID!
      bookId: String!
      title: String!
      description: String!
      authors: [String]
      image: String
    ): User
    removeBook(_id: ID!, bookId: String!): User
  }
`;

module.exports = typeDefs;
