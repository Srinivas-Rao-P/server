import Database from '../database/database';

class PersonService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async getProfile(personId: string): Promise<any> {

		return this.db.query(`
		SELECT 
			p.imageurl, ppc.phoneno, pn.name, pn.fname, pn.mname, pn.lname, pnc.email, pa.address, pa.city, pa.statecode, pa.zipcode,  p.nationality, p.dateofbirth, p.gender
		FROM profile as p
			left JOIN person_phone_contacts ppc on ppc.personid = p.candidateid  
			left join person_names pn on pn.personid = p.candidateid  
			left join person_net_contacts pnc on pnc.personid = p.candidateid 
			left join person_address pa on pa.personid = p.candidateid 
		WHERE
			p.candidateid = ${personId}
		`)
	};
	public async saveProfile(req: any): Promise<any> {

		let text = '';
		const fields: any = ['imageurl', 'firstname', 'lastname', 'phone', 'email', 'address', 'city', 'state', 'zipcode','nationality', 'dateofbirth', 'gender'];
		Object.keys(req).map((key) => {
			if (fields.indexOf(key) > -1) {
				if (typeof req[key] === 'string') {
					// tslint:disable-next-line: prefer-template
					text += key + '="' + `${req[key]}` + '",';
				} else {
					// tslint:disable-next-line: prefer-template
					text += key + '=' + `${req[key]}` + ',';
				}
			}
		});
		if (text && req.personId) {
			// text += ` UpdatedAt = UTC_TIMESTAMP, updatedUserId = ${req.personId}`;
			text += `updateduserid = ${req.personId}`;
			console.log(text);
			
			return this.db.query(`
					UPDATE
						profile
					SET
						${text}
					WHERE
						userid = '${req.personId}'
				`);
		} else {
			return null
		}
	};

	public async addEmail(req: any, personId: string): Promise<any> {
		return this.db.query(`
			INSERT INTO person_net_contacts(personid, netcontacttype, email) 
			VALUES (
				'${personId}',
				'${req.emailtype}',
				'${req.email}'
			)
		`)
	};

	public async addName(req: any, personId: string): Promise<any> {
		return this.db.query(`
			INSERT INTO person_names(personid, name, fname, mname, lname) 
			VALUES (
				'${personId}',
				'${req.firstname +' '+ req.middlename +' '+ req.lastname}',
				'${req.firstname}',
				'${req.middlename}',
				'${req.lastname}'
			)
		`)
	};

	public async addAddress(req: any, personId: string): Promise<any> {
		return this.db.query(`
			INSERT INTO person_address(personid, address, countrycode, city, statecode, zipcode) 
			VALUES (
				'${personId}',
				'${req.address}',
				'${req.countrycode}',
				'${req.city}',
				'${req.statecode}',
				'${req.zipcode}'
			)
		`)
	};

	public async addPhone(req: any, personId: string): Promise<any> {
		return this.db.query(`
			INSERT INTO person_phone_contacts(personid, phoneno) 
			VALUES (
				'${personId}',
				'${req.phone}'
			)
		`)
	};

}

export default PersonService;