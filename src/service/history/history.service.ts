import Database from '../database/database';

class HistoryService {
    private db: Database;
    private databaseget: Database;
    constructor() {
        this.db = new Database();
        this.databaseget = new Database(true);
    }

    public async deleteRecord(req: any): Promise<any> {
        await this.createHistory(req.id, req.pid, true)
        return this.db.query(`
            DELETE from ${req.pid} where id = '${req.id}'
		`)
    };

    public async createHistory(id: any, tableName:String, isDeleted:boolean = false): Promise<any> {
		
		const COLUMN_NAME = await this.db.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${tableName}_history'`);
		const req = await this.db.query(`select * from ${tableName} where id = ${id}`);
		
		let text = '';
		let value = '';
		const fields: any = COLUMN_NAME.map((key:any) => key.COLUMN_NAME);
		
		Object.keys(req[0]).map((key) => {
			if (fields.indexOf(key) > -1) {
				
				if (typeof req[0][key] === 'number') {
					text += key+', ';
					value += `${req[0][key]}, `
				} else {
					text += key+', ';
					value += `"${req[0][key]}", `
				}
			}
		});

		if (text && value && id) {
			text += ' endts ,is_deleted';
			value += ` CURRENT_TIMESTAMP(), ${isDeleted}`;

			return this.db.query(`Insert into ${tableName}_history(${text}) VALUES (${value})`);

		} else {
			return null
		}
	};

    public async getHistory(req: any): Promise<any> {        
        return this.db.query(`
			select * from ${req.pid}_history where id = '${req.id}' and pid = '${req.pid}'
		`)
    };
}

export default HistoryService;