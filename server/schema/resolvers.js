const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async ( parent, { username }) => {
            return await User.findOne({ username }).populate( 'books' )
        },
    },

    Mutation: {
        addUser: async ( parent, args ) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async ( parent, { email, password }) => {
            const user = User.findOne({ email });

            if ( !user ) {
                throw new AuthenticationError( "No user with that email" );
            }

            const correctPw = await user.isCorrectPassword( password );

            if( !correctPw ) {
                throw new AuthenticationError( "Incorrect Password" );
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async ( parent, args, context ) => {
            const upUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input }},
                { new: true }
            );
            return upUser;
        },
        removeBook: async ( parent, args, context ) => {
            const upUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId }}},
                { new: true }
            );
            return upUser;
        },
    },
};

module.exports = resolvers;