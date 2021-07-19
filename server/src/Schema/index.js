const { GraphQLObjectType, GraphQLSchema, buildSchema } = require("graphql");
const { GET_ALL_USERS, GET_USER_LOGIN, GET_USER, GET_USERS } = require("./Queries/User");
const { CREATE_USER } = require("./Mutations/User");
const { CREATE_REVIEW } = require("./Mutations/Reviews");
const { GET_MOVIE_REVIEWS } = require("./Queries/Reviews");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        getUserByLogin: GET_USER_LOGIN,
        getMovieReviews: GET_MOVIE_REVIEWS,
        Users: GET_ALL_USERS,
        User: GET_USER,
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        createReview: CREATE_REVIEW,
    }
});





const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports.schema = schema;
