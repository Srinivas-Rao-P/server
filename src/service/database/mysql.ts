import mysql, { Pool } from 'mysql';
import 'dotenv/config'

class MysqlConnection {
	public static getConnectionPool(): Pool {
		if (!MysqlConnection.connection) {
			MysqlConnection.connection = mysql.createPool({
				connectionLimit: Number(process.env.connectionLimit) || 10,
				database: process.env.database,
				host: process.env.host,
				password: process.env.password,
				user: process.env.user
			});
			// if (!process.env.NODE_ENV) {
			// MysqlConnection.connection.on('connection', (connection) => {
			// 	connection.on('connection', () => {
			// 		console.log('DB Connection established');
			// 	});
			// 	connection.on('error', function (err: any) {
			// 		console.error(new Date(), 'MySQL error', err.code);
			// 	});
			// 	connection.on('close', function (err: any) {
			// 		console.error(new Date(), 'MySQL close', err);
			// 	});
			// 	connection.on('enqueue', (sequence: any) => {
			// 		if ('Query' === sequence.constructor.name) {
			// 			console.log(sequence.sql.replace(/\s\s+|\n|\r/g, ' '));
			// 		}
			// 	});
			// });
			// }
		}
		return MysqlConnection.connection;
	}

	public static getReaderConnectionPool(): Pool {
		if (!MysqlConnection.readonlyConnection) {
			MysqlConnection.connection = mysql.createPool({
				connectionLimit: Number(process.env.connectionLimit) || 10,
				database: process.env.database,
				host: process.env.host,
				password: process.env.password,
				user: process.env.user
			});
		}
		return MysqlConnection.readonlyConnection;
	}
	private static connection: Pool;
	private static readonlyConnection: Pool;
	private constructor() { }
}
export default MysqlConnection;