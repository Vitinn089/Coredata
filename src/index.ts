import express from 'express';
import dotenv from 'dotenv';
import acessLog from './middlewares/acessLog';

const app = express();
const PORT = process.env.PORT;

dotenv.config({
	path: process.env.NODE_ENV === 'development ' ? '.env.develop' : process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});

app.use(acessLog);
app.use('/api/vitinn', );


app.listen(PORT, () => console.log(`Server is running in: ${PORT}` ));

export default app;
export {express};