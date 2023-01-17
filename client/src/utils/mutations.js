import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation(
    $id: ID!
    $bookId: String!
    $title: String!
    $description: String!
    $authors: [String]
    $image: String
  ) {
    saveBook(
      _id: $id
      bookId: $bookId
      title: $title
      description: $description
      authors: $authors
      image: $image
    ) {
      username
      bookCount
      savedBooks {
        authors
      }
    }
  }
`;
