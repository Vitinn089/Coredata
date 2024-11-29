import { Pool} from 'pg';

export default async function connect() {
	const pool = new Pool({
		host: process.env.PGHOST,
		port: Number(process.env.PGPORT),
		database: process.env.PGDATABASE,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		max: 10, // Máximo de conexões no pool
		idleTimeoutMillis: 30000 // Tempo para desconectar conexões ociosas
	});

	return  pool;
}