import Database from "../database/database";

class LeaveService {
  private db: Database;
  private databaseget: Database;
  constructor() {
    this.db = new Database();
    this.databaseget = new Database(true);
  }

  public async getLeaveTypeList(): Promise<any> {
    return this.db.query(`
		SELECT 
            lt.id, lt.type, lt.description, lt.days, lt.category 
		FROM leave_type as lt
    `);
  }

  public async getLeaveType(id:any): Promise<any> {
    return this.db.query(`
		SELECT 
            lt.id, lt.type, lt.description, lt.days, lt.category 
		FROM leave_type as lt WHERE lt.id = ${id}
    `);
  }

  public async addLeaveType(req: any): Promise<any> {
    
    return this.db.query(`
    INSERT into
        leave_type ( type, description, days, category ) 
    VALUES ( 
        '${req.type}',
        '${req.description}',
        ${req.days},
        '${req.category}'
        )
    `);
  }

  public async updateLeaveType(id: any, req: any): Promise<any> {    
    return this.db.query(`
        UPDATE leave_type set description = '${req.description}', days = ${req.days}, category = '${req.category}' 
        WHERE id = ${id}  
    `);
  }

}

export default LeaveService;
