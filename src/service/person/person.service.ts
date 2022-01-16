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
				p.imageUrl, p.fullname, p.phone, p.email, p.address, p.city, p.state, p.zipcode, p.country
				FROM 
					profile as p
				WHERE
				 p.userId = ${personId}
			`)
	};
	public async saveProfile(req: any): Promise<any> {

		let text = '';
		const fields: any = ['imageUrl', 'fullname', 'phone', 'email', 'address', 'city', 'state', 'zipcode', 'country'];
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
			text += `updatedUserId = ${req.personId}`;
			return this.db.query(`
					UPDATE
						profile
					SET
						${text}
					WHERE
						userId = '${req.personId}'
				`);
		} else {
			return null
		}
	};
}

export default PersonService;