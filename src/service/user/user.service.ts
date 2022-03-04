import Database from '../database/database';
// import { UserModel } from './user.interface';
// import { compareSync, hashSync } from 'bcryptjs';
// import TokenService from '../authentication/token';

class UserService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}
	public findUser(username: string): Promise<any> {

		return this.db.query(`
			SELECT 
				u.id as id,
				u.username as username,
				u.password as password,
				u.userRole as userRole,
				u.companyId as companyId
			FROM
				users as u
			WHERE
				u.username = '${username}'
		`);
	}

	public validatePassword(username: string, password: string): Promise<any> {
		return this.db.query(`
			SELECT 
				u.id as id,
				u.username as username 
			FROM 
				users as u 
			WHERE u.username = '${username}' 
				AND u.password = '${password}'
		`);
		// 	SELECT 
		// 		u.id as id,
		// 		u.password as password
		// 	FROM
		// 		users as u
		// 	WHERE
		// 		u.id = '${user.id}'
	}

	public findUserByToken(token: string): Promise<any> {			
		return this.db.query(`
			SELECT 
				t.refreshToken as token				
			FROM
				tokens as t
			LEFT JOIN users as u ON t.userid = u.id
			WHERE
				t.refreshToken = '${token}'
				AND u.isdeleted = 0
		`);
	}
}

export default UserService;