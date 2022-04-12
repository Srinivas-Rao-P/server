import Database from '../database/database';

class ManageuserrolesService {
    private db: Database;
    private databaseget: Database;
    constructor() {
        this.db = new Database();
        this.databaseget = new Database(true);
    }

    public async getUsers(): Promise<any> {
        return this.db.query(`
            SELECT 
                c.id, p.firstname, p.lastname
            FROM 
                candidates c
            LEFT JOIN 
                profile p 
            ON 
                c.id = p.candidateid
            WHERE 
                c.status = '3'
		`)
    };

    public async getUserroles(personId: String): Promise<any> {
        const roles = {
            userRoles: await this.db.query(`
                select u.id, u.roleDescription from userrole u
		`),
            userInRole: await this.db.query(`
                select uir.roledefinitionid as id  from users_in_role uir where uir.personid = ${personId}
            `)
        }
        return roles;
    };

    public async addUserrole(personId: String, roleId: string): Promise<any> {
        return this.db.query(`
            INSERT INTO users_in_role(personid, roledefinitionid, roleDescription, fname, lname)
            VALUES(${personId}, ${roleId}, (select u.roleDescription from userrole u where u.id = ${roleId} ),(select p.firstname from profile p where p.userid = ${personId}),(select p.lastname from profile p where p.userid = ${personId}))
		`)
    };

    public async removeUserrole(personId: String, roleId: string): Promise<any> {        
        return this.db.query(`
            DELETE FROM users_in_role where roledefinitionid = ${roleId} and personid = ${personId}
		`)
    };
}

export default ManageuserrolesService;