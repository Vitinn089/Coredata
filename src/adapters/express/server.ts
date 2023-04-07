import express from 'express';
import cors from 'cors';
import acessLog from './middlewares/acess-log';
import handleCors from './middlewares/handle-cors';
import vitinn from './routes/vitinn';
import runtime from './middlewares/runtime';

const app = express();

app.use(runtime.start);
app.use(handleCors);
app.use(cors());
app.use(acessLog);
app.use(express.json());
app.use('/api/vitinn', vitinn);
app.use(runtime.end);

export default app;
export {express};