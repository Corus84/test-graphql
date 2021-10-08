import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

const app: Express = express();
const port: number = 3000;

app.use('/graphql', graphqlHTTP({
    schema: undefined,
    graphiql: false
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});

