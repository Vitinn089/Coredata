import { Pool } from 'pg';

/* eslint-disable no-var */
declare global {
	var connection: Pool;
}