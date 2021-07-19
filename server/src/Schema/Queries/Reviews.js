const { GraphQLList, GraphQLInt } = require("graphql");
const { getRepository } = require("typeorm");
const { Reviews } = require("../../Entities/Reviews");
const { ReviewType } = require("../TypeDefs/Review");

const GET_MOVIE_REVIEWS = {
    type: new GraphQLList(ReviewType),
    args: {
        movieId: { type: GraphQLInt },
    },
    resolve: async (parent, args) => {
        if (Object.keys(args) <= 0) {
            return await getRepository(Reviews).find();
        }

        const { movieId } = args;
        const reviews = await getRepository(Reviews).find({
            movieId: movieId
        }).catch(err => {
            throw new Error("Error finding reviews");
        })
        return reviews;
    }
}

module.exports.GET_MOVIE_REVIEWS = GET_MOVIE_REVIEWS;
