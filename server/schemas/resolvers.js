// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    user: async (parent, { _id, username }) => {
      return User.findOne({
        $or: [{ _id }, { username }],
      });
    },
    users: async () => {
      return await User.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (
      parent,
      { userId, bookId, title, description },
      context
    ) => {
      // if (bookId) {
      console.log(bookId);
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            savedBooks: [
              {
                bookId: bookId,
                title: title,
                description: description,
              },
            ],
          },
        },
        { new: true, runValidators: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { user, params }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
