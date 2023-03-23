import { Pool } from 'pg';

/* eslint-disable no-var */
declare global {
	var connection: Pool;
}

export default async function connect() {
	if (global.connection)
		return await global.connection.connect();

	const pool = new Pool({
		connectionString: `postgresql://${ process.env.PGUSER }:${ process.env.PGPASSWORD }@${ process.env.PGHOST }:${ process.env.PGPORT }/${ process.env.PGDATABASE }`
	});

	//apenas testando a conexão
	const client = await pool.connect();
	console.log('\nCriou pool de conexões no PostgreSQL!');

	const res = await client.query('SELECT NOW()');
	console.info(res.rows[0], '\n');
	client.release();

	//guardando para usar sempre o mesmo
	global.connection = pool;
	return await pool.connect();
}