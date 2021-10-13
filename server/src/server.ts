import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';

const app: Express = express();
const port: number = 3000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});

