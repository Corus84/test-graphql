import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLResolveInfo, GraphQLSchema, GraphQLString } from 'graphql';

const dummyBooks = [
    { name: 'Name 1', genre: 'Genre 1', id: '1', authourId: '1'},
    { name: 'Name 2', genre: 'Genre 2', id: '2', authourId: '1'},
    { name: 'Name 3', genre: 'Genre 1', id: '3', authourId: '2'},
    { name: 'Name 4', genre: 'Genre 3', id: '4', authourId: '3'},
    { name: 'Name 5', genre: 'Genre 3', id: '5', authourId: '4'},
    { name: 'Name 6', genre: 'Genre 3', id: '6', authourId: '3'},
    { name: 'Name 7', genre: 'Genre 2', id: '7', authourId: '1'}
];
    
const dummyAuthors = [
    { name: 'Author 1', age: 25, id: '1'},
    { name: 'Author 2', age: 26, id: '2'},
    { name: 'Author 3', age: 25, id: '3'},
    { name: 'Author 4', age: 29, id: '4'}
];

const authorType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(bookType),
            resolve(source: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) {
                return dummyBooks.filter(book => book.authourId === source?.id);
            }
        }
    })
});

const bookType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: authorType,
            resolve(source: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) {
                return dummyAuthors.find(author => author.id === source?.authourId);
            }
        }
    })
});


const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {  // The name is important because it can be pluralized for the queries, is the parameter used on it
            type: bookType,
            args: { id: { type: GraphQLID }},
            resolve(source: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) {
                return dummyBooks.find(book => book.id === args?.id);
            }
        },
        author: {
            type: authorType,
            args: { id: { type: GraphQLID }},
            resolve(source: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) {
                return dummyBooks.find(author => author.id === args?.id);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery
});
