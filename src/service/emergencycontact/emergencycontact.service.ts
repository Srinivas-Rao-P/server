import Database from '../database/database';
import HistoryService from '../history/history.service';

class EmergencycontactService {
	private db: Database;
	private databaseget: Database;
	private historyService: HistoryService;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
		this.historyService = new HistoryService();
	}

	public async addEmergencyContact(personId:any, req: any): Promise<any> {		
		return this.db.query(`
			INSERT into
			emergency_contact ( name, address, phone, email, relationshipid, notes, userid ) 
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
		
		await this.historyService.createHistory(req.id, req.pid);

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
				Update emergency_contact
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async getEmergencyContactList(req: any, showDeletedRecords: String): Promise<any> {
		
		let sqlSmt = "";

		if(showDeletedRecords === "false"){
			sqlSmt = `SELECT e.id, e.pid, e.name, e.address, e.phone, e.email, dp.relationship, e.notes 
			FROM emergency_contact e LEFT JOIN dependent_relationship dp ON dp.id = e.relationshipid WHERE e.userid = ${req.personId}`;
		}else{
			sqlSmt = `SELECT e.id, e.pid, e.name, e.address, e.phone, e.email, dp.relationship, e.notes 
			FROM emergency_contact_history e LEFT JOIN dependent_relationship dp ON dp.id = e.relationshipid WHERE e.userid = ${req.personId} and e.is_deleted = true`;
			
		}
		
		return this.db.query(sqlSmt);
	};


	public async getEmergencyContact(emergencycontactId: number): Promise<any> {
		return this.db.query(`
		SELECT e.id, e.pid, e.name, e.address, e.phone, e.email, e.relationshipid, e.notes 
		FROM emergency_contact e 
		WHERE e.id = ${emergencycontactId}	
		`)
	};

	public async create(mode: string, personId: any): Promise<any> {
		const createDD = {
			relationshipList: await this.db.query(`
				SELECT dp.id, dp.relationship 
				FROM dependent_relationship dp
				where ${mode === 'addForm' ? `dp.id NOT IN (select e.relationshipid from emergency_contact e where e.userid = ${personId})` : 1} 
				ORDER BY dp.relationship
	
			`)
		}
		return createDD;
	};
}

export default EmergencycontactService;