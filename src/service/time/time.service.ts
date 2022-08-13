import Database from '../database/database';

class TimeService {
    private db: Database;
    private databaseget: Database;
    constructor() {
        this.db = new Database();
        this.databaseget = new Database(true);
    }

    public async getCompanyTimeOffList(): Promise<any> {
        return this.db.query(`
            SELECT id, start, end, name, color, timed FROM company_time_off WHERE 1 ORDER BY start asc
        `)
    }
}

export default TimeService;