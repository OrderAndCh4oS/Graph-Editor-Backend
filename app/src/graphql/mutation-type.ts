import {GraphQLObjectType} from 'graphql';

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type',
    fields: {},
});

export default MutationType;