import {GraphQLSchema} from 'graphql';
import QueryType from './query-type';

const schema = new GraphQLSchema({
    query: QueryType,
});

export default schema;
