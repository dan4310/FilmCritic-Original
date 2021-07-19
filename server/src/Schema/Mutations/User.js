const { UserType } = require("../TypeDefs/User");
const { GraphQLString, GraphQLBoolean } = require('graphql');
const { getRepository } = require("typeorm");
const { Users } = require("../../Entities/User");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        created: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
    },
    resolve: async (parent, args) => {
        var {password} = args;

        const hash = bcrypt.hashSync(password, SALT_ROUNDS);
        
        await Users.insert({...args, password: hash}).catch(error => {
            throw new Error('Didn\'t insert')
        });

        return args;

    }
    
}


module.exports.CREATE_USER = CREATE_USER;