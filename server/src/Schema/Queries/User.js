const { GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { getRepository } = require("typeorm");
const { Users } = require("../../Entities/User");
const { UserType } = require("../TypeDefs/User");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve: async () => {
        return await getRepository(Users).find();
    }
}

const GET_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLInt}
    },
    resolve: async (parent, args) => {
        const { id } = args;
        const user = await getRepository(Users).findOne({ id: id });

        if (user) {
            return user;
        }
        throw new Error("No user found");
    }
}

const GET_USER_LOGIN = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        const { password, username } = args;
        const user = await getRepository(Users).findOne({ username: username });
        
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }
            throw new Error("Passwords don't match");
        }

        throw new Error("User doesn't exist");
    }
}

module.exports.GET_ALL_USERS = GET_ALL_USERS;
module.exports.GET_USER_LOGIN = GET_USER_LOGIN;
module.exports.GET_USER = GET_USER;
