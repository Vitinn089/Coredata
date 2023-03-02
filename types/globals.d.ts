/* eslint-disable no-var */
import { Pool } from 'pg';

declare global {
    var connection: Pool;
}