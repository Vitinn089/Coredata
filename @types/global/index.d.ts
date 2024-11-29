import { Pool } from 'pg';

export {};

/* eslint-disable no-var */
declare global {
	type Connection = Pool;
}