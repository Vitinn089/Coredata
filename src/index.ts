import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import acessLog from './middlewares/acessLog';
import handleCors from './middlewares/handleCors';
import vitinn from './routes/vitinn';
import updateConfig from './routes/updateConfig';

dotenv.config({
	path: process.env.NODE_ENV === 'development ' ? '.env.develop' : process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});
const app = express();
const PORT = process.env.PORT;

app.use(handleCors);
app.use(cors());
app.use(acessLog);
app.use(express.json());
app.use('/api/vitinn', vitinn);
app.use('/api/update-config', updateConfig);


app.listen(PORT, () => console.log(`\nServer is running in: http://localhost:${PORT}/` ));

export default app;
export {express};