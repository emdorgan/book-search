const {User, Book} = require('../models')

const resolvers = {
    Query: {
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId}).populate('savedBooks')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const newUser = await User.create(args);
            return newUser;
        },

    }
}

module.exports = resolvers;