import Database from '../database/database';

class EmailService {
    private db: Database;
	constructor() {
		this.db = new Database();
	}

    public async getCandidateDataById (id: number): Promise<any> {        
        return this.db.query(`
            SELECT c.id, c.link
            FROM 
			    candidates c 
		    WHERE 
			    c.id = ${id}	
        `)
    };
}

export default EmailService;