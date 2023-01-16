// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { _id, username }) => {
      return User.findOne({
        $or: [{ _id, username }],
      });
    },
  },
};

module.exports = resolvers;
