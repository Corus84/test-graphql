import { GraphQLObjectType, GraphQLResolveInfo, GraphQLSchema, GraphQLString } from 'graphql';

const dummyData = [
    { name: 'Name 1', genre: 'Genre 1', id: '1'},
    { name: 'Name 2', genre: 'Genre 2', id: '2'},
    { name: 'Name 3', genre: 'Genre 1', id: '3'},
    { name: 'Name 4', genre: 'Genre 3', id: '4'}
];

const bookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {  // The name is important because it can be pluralized for the queries, is the parameter used on it
            type: bookType,
            args: { id: { type: GraphQLString }},
            resolve(source: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) {
                return dummyData.find(data => data.id === args?.id);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery
});
