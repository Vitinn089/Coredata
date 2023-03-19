import express from 'express';
import cors from 'cors';
import acessLog from './middlewares/acessLog';
import handleCors from './middlewares/handleCors';
import vitinn from './routes/vitinn';
import appConfigs from './config/config';

const app = express();
const PORT = appConfigs.PORT;

app.use(handleCors);
app.use(cors());
app.use(acessLog);
app.use(express.json());
app.use('/api/vitinn', vitinn);


app.listen(PORT, () => console.log(`\nServer is running in: http://localhost:${PORT}/` ));

export default app;
export {express};