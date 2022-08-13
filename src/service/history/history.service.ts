import Database from '../database/database';

class HistoryService {
    private db: Database;
    private databaseget: Database;
    constructor() {
        this.db = new Database();
        this.databaseget = new Database(true);
    }

    public async deleteRecord(req: any): Promise<any> {
        await this.createHistory(req, true)
        return this.db.query(`
            DELETE from ${req.pid} where id = '${req.id}'
		`)
    };

    public async createHistory(req: any, isdeleted: Boolean = false): Promise<any> {
        return this.db.query(`
			INSERT into
			history ( recordid, pid, logid, isdeleted ) 
			VALUES ( 
				'${req.id}',
				'${req.pid}',
                '${req.id}',
                ${isdeleted}
			)
		`)
    };

    public async getHistory(req: any, isdeleted: Boolean = false): Promise<any> {
        return this.db.query(`
			select * from history where recordid = '${req.id}' and pid = '${req.pid}' and isdeleted = ${isdeleted}
		`)
    };
}

export default HistoryService;