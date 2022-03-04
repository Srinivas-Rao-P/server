import Database from '../database/database';

class BankService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async addBank(personId:any, req: any): Promise<any> {		
		return this.db.query(`
			INSERT into
				bankdetails ( accountholdername, bankname, accounttypeid, accountnumber, ifsccode, bankbranch, bankaddress, userid ) 
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
				Update bankdetails
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async getBankList(req: any): Promise<any> {
		return this.db.query(`
			SELECT b.id, b.bankname, bt.type, b.accountnumber, b.ifsccode
			FROM 
				bankdetails b                
			LEFT JOIN 
				bankaccounttypes bt 
			ON 
				b.accounttypeid = bt.id
			WHERE 
				userid = ${req.personId}	
		`)
	};

	public async validateAccountNumber(accountnumber: number): Promise<any> {
		return this.db.query(`
		SELECT 
			accountnumber 
		FROM 
			bankdetails 
		WHERE 
			accountnumber = ${accountnumber}	
		`)
	};

	public async getBankData(bankId: number): Promise<any> {
		return this.db.query(`
		SELECT 
			b.id, b.accountholdername, b.bankname, b.accounttypeid, b.accountnumber, b.ifsccode, b.bankbranch, b.bankaddress 
		FROM 
			bankdetails b 
		WHERE 
			b.id = ${bankId}	
		`)
	};

	public async create(mode: string, personId: any): Promise<any> {
		const createDD = {
			bankaccounttypes: await this.db.query(`
				SELECT 
					b.id, b.type FROM bankaccounttypes b
				where ${mode === 'addForm' ? `b.id NOT IN (select b.accounttypeid from bankdetails b where b.userid = ${personId})` : 1}	
			`)
		}
		return createDD;
	};
}

export default BankService;