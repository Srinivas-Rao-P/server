import Database from '../database/database';

class ActivityLogService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async addActivityLog(req: any): Promise<any> {
		return this.db.query(`
            INSERT INTO activitylog(Module,Module_Id,Description,createdAt,createdUserId)
            Values(
                '${req.module ? req.module : ''}',
                ${req.module_Id}, 
                ${req.description ? this.db.connection.escape(req.description) : null},
                UTC_TIMESTAMP,
                ${req.userid ? req.userid : null}
            )
        `);
	}

    public async getActivityLog(req: any): Promise<any> {

		return this.databaseget.query(`
		CALL getActivityLog(
			${req.module ? this.db.connection.escape(req.module) : null},
            ${req.module_Id}, 		
            ${req.subModule_Id}, 
            ${req.subModule ? this.db.connection.escape(req.subModule) : null},
            ${req.fromDate ? req.fromDate : null}, 
            ${req.toDate ? req.toDate : null},                 
            ${req.pageSize ? req.pageSize : null},
            ${req.pageIndex ? req.pageIndex : 0},
            ${req.sortExpression ? this.db.connection.escape(req.sortExpression) : null},
            ${req.sortDirection ? this.db.connection.escape(req.sortDirection) : null}
		    )
		`);
	}
}
export default ActivityLogService;