import MysqlConnection from './mysql';
import mysql, { Pool, FieldInfo, MysqlError } from 'mysql';
import DatabaseInterface, { DatabaseResponse } from './database.interface';

class Database implements DatabaseInterface {
	public connection: Pool;
	constructor(readonly: boolean = false) {
		// use the singleton connection pools
		this.connection = readonly ? MysqlConnection.getReaderConnectionPool() : MysqlConnection.getConnectionPool();
	}

	public closeConnection(): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.connection) {
				console.log("connected");
				
				return resolve("Connected");
			}
			this.connection.end((err: MysqlError) => {
				if (err) {
					return reject(err);
				}
				console.log('Failed to close connections');
				
				return resolve('Failed to close connections');
			});
		});
	}

	public query(query: string, values?: string[] | number[]): Promise<any> {
		return new Promise((resolve, reject) => {
			const preparedStatement = mysql.format(query, values);
			this.connection.query(preparedStatement, (err, results: any) => {
				if (err) {
					return reject(err);
				}
				return resolve(results);
			});
		});
	}
}

export default Database;