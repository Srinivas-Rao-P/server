import Database from '../database/database';

class EmergencycontactService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async addEmergencyContact(personId:any, req: any): Promise<any> {		
		return this.db.query(`
			INSERT into
			emergencycontact ( name, address, phone, email, relationshipid, notes, userid ) 
			VALUES ( 
				'${req.name}',
				'${req.address}',
				${req.phone},
				'${req.email}',
				'${req.relationshipid}',
				'${req.notes}',
				${personId}
			)
		`)
	};

	public async updateEmergencyContact(req: any): Promise<any> {
		let text = '';
		const fields: any = [
			'name',
			'address',
			'phone',
			'email',
			'notes'
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
				Update emergencycontact
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async getEmergencyContactList(req: any): Promise<any> {
		return this.db.query(`
			SELECT e.id, e.name, e.address, e.phone, e.email, dp.relationship, e.notes 
			FROM emergencycontact e
			LEFT JOIN 
				dependentrelationship dp 
			ON 
				dp.id = e.relationshipid
			WHERE e.userid = ${req.personId}	
		`)
	};


	public async getEmergencyContact(emergencycontactId: number): Promise<any> {
		return this.db.query(`
		SELECT e.id, e.name, e.address, e.phone, e.email, e.relationshipid, e.notes 
		FROM emergencycontact e 
		WHERE e.id = ${emergencycontactId}	
		`)
	};

	public async create(mode: string, personId: any): Promise<any> {
		const createDD = {
			relationshipList: await this.db.query(`
				SELECT dp.id, dp.relationship 
				FROM dependentrelationship dp
				where ${mode === 'addForm' ? `dp.id NOT IN (select e.relationshipid from emergencycontact e where e.userid = ${personId})` : 1} 
				ORDER BY dp.relationship
	
			`)
		}
		return createDD;
	};
}

export default EmergencycontactService;