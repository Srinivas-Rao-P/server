import Database from '../database/database';

class PersonService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	public async getNames(personId: string): Promise<any> {

		return this.db.query(`
            select 
            pn.pernamespid, pn.effectivedate, pn.nameevent, pn.nametype, pn.name, pn.fname, pn.mname, pn.lname, pn.title, pn.nameformatpreference, pn.enddate, pn.createts, pn.endts
            from 
                person_names pn 
            where 
                pn.personid = ${personId}
		`)
	};

    public async getAddress(personId: string): Promise<any> {

		return this.db.query(`
        SELECT 
        pa.peraddpid, pa.addresstype, pa.effectivedate, pa.address, pa.countrycode, pa.city, pa.statecode, pa.zipcode, pa.privacycode, pa.enddate, pa.creatts, pa.endts 
        FROM 
            person_address pa 
        where 
            pa.personid = ${personId}
		`)
	};

    public async getEmails(personId: string): Promise<any> {

		return this.db.query(`
            SELECT 
                pnc.pernetcontactpid, pnc.netcontacttype, pnc.effectivedate, pnc.enddate, pnc.email, pnc.privacycode, pnc.createts, pnc.endts 
            FROM 
                person_net_contacts pnc 
            WHERE 
                pnc.personid = ${personId}
		`)
	};
    
    public async getPhones(personId: string): Promise<any> {

		return this.db.query(`
        SELECT 
            ppc.percontactpid ,ppc.effectivedate, ppc.countrycode, ppc.phonecontacttype, ppc.phoneno, ppc.privacycode, ppc.enddate, ppc.createts, ppc.endts 
        FROM 
            person_phone_contacts ppc
        WHERE 
            ppc.personid = ${personId}
		`)
	};
	

	public async addPhone(req: any, personId: string): Promise<any> {
		return this.db.query(`
			INSERT INTO person_phone_contacts(personid, phoneno) 
			VALUES (
				'${personId}',
				'${req.phone}'
			)
		`)
	};

}

export default PersonService;