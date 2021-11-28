const { AuthenticationError } = require('apollo-server-express');
const {User, Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId}).populate('savedBooks')
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(newUser)

            return { token, user}
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No user found with this info')
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        // addBook: async (parent, {})
        // removeBook
    }
}

module.exports = resolvers;