import express from 'express';
import cors from 'cors';
import acessLog from './middlewares/acess-log';
import handleCors from './middlewares/handle-cors';
import coredata from './routes/coredata';
import runtime from './middlewares/runtime';
import handlerError from './middlewares/handler-error';

const app = express();

app.use(runtime.start);
app.use(handleCors);
app.use(cors());
app.use(acessLog);
app.use(express.json());
app.use('/api/coredata', coredata);
app.use(runtime.end);
app.use(handlerError);

export default app;