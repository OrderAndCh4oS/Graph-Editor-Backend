import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {resolver} from "graphql-sequelize";

import db from "../model";

// Todo: Look into implementing https://github.com/mickhansen/graphql-sequelize
// Todo: Look into implementing https://github.com/mickhansen/dataloader-sequelize

const ModelType = new GraphQLObjectType({
    name: 'Models',
    description: 'Users of the App',
    // @ts-ignore
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users of the App',
    // @ts-ignore
    fields: {
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        models: {
            type: new GraphQLList(ModelType),
            resolve: resolver(db.user.model)
        }
    }
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query type.',
    // @ts-ignore
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return 'HELLO!!'
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt),
                    description: 'User id'
                }
            },
            resolve: resolver(db.user)
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: resolver(db.user)
        },
        model: {
            type: ModelType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt),
                    description: 'User id'
                }
            },
            resolve: resolver(db.model)
        },
        models: {
            type: new GraphQLList(ModelType),
            resolve: resolver(db.model)
        }
    }
});

export default QueryType;