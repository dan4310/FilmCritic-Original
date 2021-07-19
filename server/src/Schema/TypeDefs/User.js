const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        created: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
    })
});

module.exports.UserType = UserType;