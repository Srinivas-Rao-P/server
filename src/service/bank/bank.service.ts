import Database from '../database/database';
import HistoryService from '../history/history.service';

class BankService {
	private db: Database;
	private databaseget: Database;
	private historyService: HistoryService;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
		this.historyService = new HistoryService();
	}

	public async addBank(personId:any, req: any): Promise<any> {		
		return this.db.query(`
			INSERT into
				bank_details ( accountholdername, bankname, accounttypeid, accountnumber, ifsccode, bankbranch, bankaddress, userid ) 
			VALUES ( 
				'${req.accountholdername}',
				'${req.bankname}',
				${req.accounttypeid},
				'${req.accountnumber}',
				'${req.ifsccode}',
				'${req.bankbranch}',
				'${req.bankaddress}',
				${personId}
			)
		`)
	};

	public async updateBank(req: any): Promise<any> {

		await this.historyService.createHistory(req.id, req.pid);

		let text = '';
		const fields: any = [
			'accountholdername',
			'bankname',
			'accountnumber',
			'ifsccode',
			'bankbranch',
			'bankaddress',
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
				Update bank_details
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async getBankList(req: any, showDeletedRecords: String): Promise<any> {

		let sqlSmt = "";

		if(showDeletedRecords === "false"){
			sqlSmt = `SELECT b.id, b.pid, b.bankname, bt.type, b.accountnumber, b.ifsccode
			FROM bank_details b                
			LEFT JOIN bank_account_types bt ON b.accounttypeid = bt.id
			WHERE userid = ${req.personId}	`
		} else {
			sqlSmt = `SELECT b.id, b.pid, b.bankname, bt.type, b.accountnumber, b.ifsccode 
			FROM bank_details_history b LEFT JOIN bank_account_types bt ON b.accounttypeid = bt.id where b.userid = ${req.personId} and b.is_deleted = true`
		}

		return this.db.query(sqlSmt)
	};

	public async validateAccountNumber(accountnumber: number): Promise<any> {
		return this.db.query(`
		SELECT 
			accountnumber 
		FROM 
			bank_details 
		WHERE 
			accountnumber = ${accountnumber}	
		`)
	};

	public async getBankData(bankId: number): Promise<any> {
		return this.db.query(`
		SELECT 
			b.id, b.pid, b.accountholdername, b.bankname, b.accounttypeid, b.accountnumber, b.ifsccode, b.bankbranch, b.bankaddress 
		FROM 
			bank_details b 
		WHERE 
			b.id = ${bankId}	
		`)
	};

	public async create(mode: string, personId: any): Promise<any> {
		const createDD = {
			bankaccounttypes: await this.db.query(`
				SELECT 
					b.id, b.type FROM bank_account_types b
				where ${mode === 'addForm' ? `b.id NOT IN (select b.accounttypeid from bank_details b where b.userid = ${personId})` : 1}	
			`)
		}
		return createDD;
	};
}

export default BankService;