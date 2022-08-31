const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Book {
        _id: ID!
        bookId: String
        title: String
        authors: [String]
        image: String
        link: String
        description: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    input newBook {
        bookId: String
        title: String
        authors: [String]
        image: String
        link: String
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login( email: String!, password: String! ): Auth
        addUser( username: String!, email: String!, password: String! ): Auth
        saveBook( input: newBook! ): User
        removeBook( bookId: ID! ): user
    }
`

module.exports = typeDefs;