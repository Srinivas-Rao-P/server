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
				p.imageurl, p.firstname, p.lastname, p.phone, p.email, p.address, p.city, p.state, p.zipcode, p.nationality, p.dateofbirth, p.gender
				FROM 
					profile as p
				WHERE
				 p.userid = ${personId}
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
}

export default PersonService;