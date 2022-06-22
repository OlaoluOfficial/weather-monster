import 'dotenv/config';
import express, { json } from 'express';
import logger from 'morgan';
import routes from './routes/routes';
import errorHandlerMiddleware from './middlewares/errorHandler';
import notFoundMiddleware from './middlewares/notFound';

const app = express();
app.use(json());

app.use(logger('dev'));

routes(app);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
