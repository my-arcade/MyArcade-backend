import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from 'config';
import graphqlHttp from 'express-graphql';

import schema from 'graphql/schema';
import rootValue from 'graphql/resolvers';

// create express application
export const app = express();

app.disable('x-powered-by');

// 3rd Party Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//
app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to myarcade' });
});

app.use(
  '/graphql',
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true
  })
);

// for error handling
app.use((req, res, next) => {
  const error = new Error('Not found');

  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`API on http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error(error);
  }
};
