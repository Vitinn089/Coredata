import dotenv from 'dotenv';

dotenv.config({
	path: process.env.NODE_ENV === 'development ' ? '.env.develop' : process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});

export default {
	ENVIRONMENT: process.env.NODE_ENV,
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',
	PORT: process.env.PORT,
	URL_REPOSITORY: process.env.URL_REPOSITORY || '',
	TOKEN_GITHUB: process.env.TOKEN_GITHUB,
	PGUSER: process.env.PGUSER,
	PGPASSWORD: process.env.PGPASSWORD,
	PGHOST: process.env.PGHOST,
	PGPORT: process.env.PGPORT,
	PGDATABASE: process.env.PGDATABASE,
};