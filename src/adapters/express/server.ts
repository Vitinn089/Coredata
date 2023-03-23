import express from 'express';
import cors from 'cors';
import acessLog from './middlewares/acessLog';
import handleCors from './middlewares/handleCors';
import vitinn from './routes/vitinn';

const app = express();

app.use(handleCors);
app.use(cors());
app.use(acessLog);
app.use(express.json());
app.use('/api/vitinn', vitinn);

export default app;
export {express};