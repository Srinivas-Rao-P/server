import Database from '../database/database';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class CandidateService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async addCandidate(req: any): Promise<any> {
		return this.db.query(`
		INSERT INTO candidates
			(designation, hiredate, note, employerid, managerid, referrerid)
			VALUES (	
				'${req.designation}',
				'${req.hiredate}',	
				'${req.note}',						
				'${req.userid}',
				'${req.managerid}',
				'${req.referrerid}'				
			)
		`)
	};

	public async updateCandidate(req: any): Promise<any> {
		let text = '';
		const fields: any = [
			'status',
			'managerid',
			'designation',
			'note'
		];
		Object.keys(req).map((key) => {
			if (fields.indexOf(key) > -1) {
				if (typeof req[key] === 'string') {
					text += key + '="' + `${req[key]}` + '",';
				} else {
					text += key + '=' + `${req[key]}` + ',';
				}
			}
		});

		if (text && req.id) {
			text += ` updatedat = UTC_TIMESTAMP, updateduserid = ${req.userid}`;
			return this.db.query(`
				Update candidates
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async getCandidateList(req: any): Promise<any> {
		return this.db.query(`
			SELECT c.id, p.firstname, p.lastname, p.email, c.designation, c.date, cs.status
			FROM 
				candidates c                
			LEFT JOIN 
				candidatestatus cs 
			ON 
				c.status = cs.id
				LEFT JOIN 
				profile p 
			ON 
				c.id = p.candidateid
			WHERE 
				employerid = ${req.userid}
			ORDER BY c.date DESC	
		`)
	};

	public async getCandidateData(candidateId: number): Promise<any> {
		return this.db.query(`
		SELECT 
			c.id, p.firstname, p.lastname, p.email, c.date, c.designation, c.status, c.note, c.employerid, c.managerid, c.referrerid 
		FROM 
			candidates c 
        LEFT JOIN 
        	profile p
        ON	
			c.id = p.candidateid
		WHERE 
			c.id =  ${candidateId}	
		`)
	};

	public async create(): Promise<any> {
		const createDD = {
			managerList: await this.db.query(`
				SELECT u.id, u.username as name FROM users u WHERE userRole = '2'	
				union
				select uir.id, uir.fname as name from users_in_role uir WHERE uir.roledefinitionid = '2'	
		`),
			referrerList: await this.db.query(`
				SELECT u.id, u.username as name FROM users u
				union
				select uir.id, uir.fname as name from users_in_role uir group by name		
		`),
			statusList: await this.db.query(`
			SELECT c.id, c.status FROM candidatestatus c	
		`),
		}
		return createDD;
	};

}

export default CandidateService;