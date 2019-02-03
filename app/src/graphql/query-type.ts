import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {resolver} from "graphql-sequelize";

import model from "../model";

// Todo: Look into implementing https://github.com/mickhansen/graphql-sequelize
// Todo: Look into implementing https://github.com/mickhansen/dataloader-sequelize

const TaskType = new GraphQLObjectType({
    name: 'Tasks',
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
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: resolver(model.user.task)
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
            resolve: resolver(model.user)
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: resolver(model.user)
        },
        task: {
            type: TaskType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt),
                    description: 'User id'
                }
            },
            resolve: resolver(model.task)
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: resolver(model.task)
        }
    }
});

export default QueryType;