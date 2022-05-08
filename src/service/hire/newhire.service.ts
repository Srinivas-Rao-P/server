import Database from '../database/database';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class NewhireService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async addNewhire(req: any): Promise<any> {
		return this.db.query(`
		INSERT INTO newhires
			(designation, hiredate, note, employerid, managerid, referrerid)
			VALUES (	
				'${req.designation}',
				'${req.hiredate}',	
				'${req.note}',						
				'${req.userid}'
				'${req.managerid}',
				'${req.referrerid}'				
			)
		`)
	};
}

export default NewhireService;