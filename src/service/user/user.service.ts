import Database from '../database/database';
const jwt = require('jsonwebtoken');
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
				u.userRole as userRole
			FROM
				users as u
			WHERE
				u.username = '${username}'
		`);
	}

	public findCandidate(req: any): Promise<any> {		
		
		return this.db.query(`
			SELECT p.candidateid, p.email, 5 as userRole
			FROM profile p 
			WHERE p.email = '${req.email}' AND p.candidateid = ${req.candidateId}
		`);
	}

	public verifyToken(token: string): Promise<any> {
		return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any) => {
			if (err) {
				return false;
			}
			return true;
		})
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