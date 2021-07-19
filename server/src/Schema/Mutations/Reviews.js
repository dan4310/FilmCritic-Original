const { ReviewType } = require("../TypeDefs/Review");
const { GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');
const { getRepository } = require("typeorm");
const { Reviews } = require("../../Entities/Reviews");
const { UserType } = require("../TypeDefs/User");

const CREATE_REVIEW = {
    type: ReviewType,
    args: {
        authorId: { type: GraphQLInt },
        created: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        movieId: { type: GraphQLInt},
    },
    resolve: async (parent, args) => {
        await getRepository(Reviews).insert(args).catch(error => {
            throw new Error('Didn\'t insert')
        });

        return args;

    }
    
}


module.exports.CREATE_REVIEW = CREATE_REVIEW;