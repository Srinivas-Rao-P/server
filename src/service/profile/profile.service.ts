import Database from '../database/database';

class ProfileService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async createProfile(req: any, personId:any): Promise<any> {			
			
		return this.db.query(`
			INSERT into
			profile (
				dateofbirth, gender, maritalstatus, candidateid) 
			VALUES (			
				'${req.dob}',
				'${req.gender}',
				'${req.maritalstatus}',
				'${personId}'
			)
		`)
	};	

	public async updateProfile(req: any): Promise<any> {
		let text = '';
		const fields: any = [
			'firstname',
			'lastname',
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
				Update profiles
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async getProfileList(req: any): Promise<any> {
		return this.db.query(`
			SELECT c.id, c.firstname, c.lastname, c.email, c.designation, c.date, cs.status
			FROM 
				profiles c                
			LEFT JOIN 
				profilestatus cs 
			ON 
				c.status = cs.id
			WHERE 
				employerid = ${req.userid}
			ORDER BY c.date DESC	
		`)
	};

	public async getProfileData(profileId: number): Promise<any> {
		return this.db.query(`
		SELECT 
			c.id, c.firstname, c.lastname, c.email, c.date, c.designation, c.status, c.note, c.employerid, c.managerid, c.referrerid 
		FROM 
			profiles c 
		WHERE 
			c.id = ${profileId}	
		`)
	};

	public async create(): Promise<any> {
		const createDD = {
			managerList: await this.db.query(`
			SELECT u.id, u.username as name FROM users u WHERE userRole = 2	
		`),
			referrerList: await this.db.query(`
			SELECT u.id, u.username as name FROM users u	
		`),
			statusList: await this.db.query(`
			SELECT c.id, c.status FROM profilestatus c	
		`),
		}
		return createDD;
	};

	// public async addProfileBasicInformation(req: any): Promise<any> {		
	// 	return this.db.query(`
	// 		INSERT into
	// 		profiles (
	// 			firstname, lastname, email, status, managerid, referrerid, designation, note, link, employerid) 
	// 		VALUES (
	// 			'${req.firstname}',
	// 			'${req.lastname}',
	// 			'${req.email}',
	// 			${req.status ? req.status : 1},
	// 			'${req.managerid}',
	// 			'${req.referrerid}',
	// 			'${req.designation}',
	// 			'${req.note}',
	// 			'${jwt.sign({ firstname: req.firstname.toLowerCase(), lastname: req.lastname.toLowerCase(), email: req.email.toLowerCase() }, process.env.ACCESS_TOKEN_SECRET)}',
	// 			${req.userid}
	// 		)
	// 	`)
	// };
}

export default ProfileService;