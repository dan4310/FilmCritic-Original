const { GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLString } = require("graphql");
const { UserType } = require("./User");

const ReviewType = new GraphQLObjectType({
    name: "Review",
    fields: () => ({
        id: { type: GraphQLID },
        authorId: { type: GraphQLInt },
        created: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        movieId: { type: GraphQLInt},
    })
});

module.exports.ReviewType = ReviewType;