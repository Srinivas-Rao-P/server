import Database from "../database/database";
import HistoryService from "../history/history.service";

class PersonService {
  private db: Database;
  private databaseget: Database;
  private historyService: HistoryService;
  constructor() {
    this.db = new Database();
    this.databaseget = new Database(true);
    this.historyService = new HistoryService();
  }

  public async addPhone(personId: any, req: any): Promise<any> {
    return this.db.query(`
			INSERT into
			person_phone_contacts ( phoneno, countrycode, phonecontacttype, userid ) 
			VALUES ( 
				'${req.phoneno}',
				'${req.countrycode}',
				${req.phonecontacttype},				
				${personId}
			)
		`);
  }

  public async updatePhone(req: any): Promise<any> {
    await this.historyService.createHistory(req.id, req.pid);

    let text = "";
    const fields: any = ["phoneno", "countrycode", "phonecontacttype"];
    Object.keys(req).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof req[key] === "string") {
          text += key + '="' + `${req[key]}` + '",';
        } else {
          text += key + "=" + `${req[key]}` + ",";
        }
      }
    });

    if (text && req.id) {
      text += ` updatedat = UTC_TIMESTAMP, updateduserid = ${req.userid}`;
      return this.db.query(`
				Update person_phone_contacts
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
    } else {
      return null;
    }
  }

  public async getPhoneList(
    req: any,
    showDeletedRecords: String
  ): Promise<any> {
    let sqlSmt = "";

    if (showDeletedRecords === "false") {
      sqlSmt = `SELECT ppc.id, ppc.pid, ppc.countrycode, pct.description as type, ppc.phoneno FROM person_phone_contacts ppc LEFT JOIN phone_contact_types pct ON pct.id = ppc.phonecontacttype WHERE ppc.userid = ${req.personId}`;
    } else {
      sqlSmt = `SELECT ppc.id, ppc.pid, ppc.effectivedate, ppc.countrycode, pct.description as type, ppc.phoneno
			FROM person_phone_contacts_history ppc LEFT JOIN phone_contact_types pct ON pct.id = ppc.phonecontacttype WHERE ppc.userid = ${req.personId} and ppc.is_deleted = true`;
    }

    return this.db.query(sqlSmt);
  }

  public async getPhoneContact(phoneId: number): Promise<any> {
    return this.db.query(`
		SELECT ppc.id, ppc.pid, ppc.phoneno, ppc.phonecontacttype, ppc.countrycode 
		FROM person_phone_contacts ppc 
		WHERE ppc.id = ${phoneId}	
		`);
  }

  public async createPhone(mode: string, personId: any): Promise<any> {
    const createDD = {
      phoneContactTypeList: await this.db.query(`
				SELECT pct.id, pct.description 
				FROM phone_contact_types pct
				where ${
          mode === "addForm"
            ? `pct.id NOT IN (select ppc.phonecontacttype from person_phone_contacts ppc where ppc.userid = ${personId})`
            : 1
        } 
				ORDER BY pct.description
			`),
    };
    return createDD;
  }

  public async addName(personId: any, req: any): Promise<any> {
    return this.db.query(`
			INSERT into
			person_names ( name, fname, mname, lname, title, nametype, userid ) 
			VALUES ( 
				'${req.fname +' '+ req.mname +' '+ req.lname}',
				'${req.fname}',
				'${req.mname}',
				'${req.lname}',	
				'${req.title}',
				${req.nametype},			
				${personId}
			)
		`);
  }

  public async updateName(req: any): Promise<any> {
    await this.historyService.createHistory(req.id, req.pid);

    let text = "";
    const fields: any = ["fname", "mname", "lname", "title"];
    Object.keys(req).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof req[key] === "string") {
          text += key + '="' + `${req[key]}` + '",';
        } else {
          text += key + "=" + `${req[key]}` + ",";
        }
      }
    });

    if (text && req.id) {
      text += ` name = '${req.fname +' '+ req.mname +' '+ req.lname}', updatedat = UTC_TIMESTAMP, updateduserid = ${req.userid}`;
      console.log(text);
      
      return this.db.query(`
				Update person_names
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
    } else {
      return null;
    }
  }

  public async getNameList(req: any, showDeletedRecords: String): Promise<any> {
    let sqlSmt = "";

    if (showDeletedRecords === "false") {
      sqlSmt = `SELECT pn.id, pn.pid, pn.fname, pn.mname, pn.lname, pn.title, nt.description as type FROM person_names pn LEFT JOIN name_types nt ON nt.id = pn.nametype where pn.userid = ${req.personId}`;
    } else {
      sqlSmt = `SELECT pn.id, pn.pid, pn.fname, pn.mname, pn.lname, pn.title, nt.description as type FROM person_names_history pn LEFT JOIN name_types nt ON nt.id = pn.nametype where pn.userid = ${req.personId} and pn.is_deleted = true`;
    }

    return this.db.query(sqlSmt);
  }

  public async getName(nameId: number): Promise<any> {
    return this.db.query(`
		SELECT pn.id, pn.pid, pn.fname, pn.mname, pn.lname, pn.title, pn.nametype 
		FROM person_names pn 
		WHERE pn.id = ${nameId}	
		`);
  }

  public async createName(mode: string, personId: any): Promise<any> {
    const createDD = {
      nameTypeList: await this.db.query(`
				SELECT nt.id, nt.description 
				FROM name_types nt
				where ${
          mode === "addForm"
            ? `nt.id NOT IN (select pn.nametype from person_names pn where pn.userid = ${personId})`
            : 1
        } 
				ORDER BY nt.description
			`),
    };
    return createDD;
  }

  public async addEmail(personId: any, req: any): Promise<any> {
    
    return this.db.query(`
			INSERT into
			person_net_contacts ( email, netcontacttype, userid ) 
			VALUES ( 
				'${req.email}',
				${req.netcontacttype},			
				${personId}
			)
		`);
  }

  public async updateEmail(req: any): Promise<any> {
    await this.historyService.createHistory(req.id, req.pid);

    let text = "";
    const fields: any = ["email"];
    Object.keys(req).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof req[key] === "string") {
          text += key + '="' + `${req[key]}` + '",';
        } else {
          text += key + "=" + `${req[key]}` + ",";
        }
      }
    });

    if (text && req.id) {
      text += ` updatedat = UTC_TIMESTAMP, updateduserid = ${req.userid}`;
      return this.db.query(`
				Update person_net_contacts
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
    } else {
      return null;
    }
  }

  public async getEmailList(
    req: any,
    showDeletedRecords: String
  ): Promise<any> {
    let sqlSmt = "";

    if (showDeletedRecords === "false") {
      sqlSmt = `SELECT pnc.id, pnc.pid, pnc.email, nct.description as type FROM person_net_contacts pnc LEFT JOIN net_contact_types nct ON nct.id = pnc.netcontacttype where pnc.userid = ${req.personId}`;
    } else {
      sqlSmt = `SELECT pnc.id, pnc.pid, pnc.email, nct.description as type FROM person_net_contacts_history pnc LEFT JOIN net_contact_types nct ON nct.id = pnc.netcontacttype where pnc.userid = ${req.personId} and pnc.is_deleted = true`;
    }

    return this.db.query(sqlSmt);
  }

  public async getEmail(emailId: number): Promise<any> {
    return this.db.query(`
		SELECT pnc.id, pnc.pid, pnc.email, pnc.netcontacttype 
		FROM person_net_contacts pnc 
		WHERE pnc.id = ${emailId}	
		`);
  }

  public async createEmail(mode: string, personId: any): Promise<any> {
    const createDD = {
      emailTypeList: await this.db.query(`
				SELECT nct.id, nct.description 
				FROM net_contact_types nct
				where ${
          mode === "addForm"
            ? `nct.id NOT IN (select pnc.netcontacttype from person_net_contacts pnc where pnc.userid = ${personId})`
            : 1
        } 
				ORDER BY nct.description
			`),
    };
    return createDD;
  }

  public async addAddress(personId: any, req: any): Promise<any> {
   
    return this.db.query(`
			INSERT into
			person_address ( address, addresstype, city, countrycode, statecode, zipcode, userid ) 
			VALUES ( 
				'${req.address}',
				${req.addresstype},			
				'${req.city}',
				'${req.countrycode}',			
				'${req.statecode}',
				${req.zipcode},			
				${personId}
			)
		`);
  }

  public async updateAddress(req: any): Promise<any> {
    await this.historyService.createHistory(req.id, req.pid);

    let text = "";
    const fields: any = [
      "address",
      "addresstype",
      "city",
      "countrycode",
      "statecode",
      "zipcode",
    ];
    Object.keys(req).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof req[key] === "string") {
          text += key + '="' + `${req[key]}` + '",';
        } else {
          text += key + "=" + `${req[key]}` + ",";
        }
      }
    });

    if (text && req.id) {
      text += ` updatedat = UTC_TIMESTAMP, updateduserid = ${req.userid}`;
      return this.db.query(`
				Update person_address
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
    } else {
      return null;
    }
  }

  public async getAddressList(
    req: any,
    showDeletedRecords: String
  ): Promise<any> {
    let sqlSmt = "";

    if (showDeletedRecords === "false") {
      sqlSmt = `SELECT pa.id, pa.pid, pa.address, pa.countrycode, pa.statecode, pa.city, pa.zipcode, at.description as type FROM person_address pa LEFT JOIN address_types at ON at.id = pa.addresstype where pa.userid = ${req.personId}`;
    } else {
      sqlSmt = `SELECT pa.id, pa.pid, pa.address, pa.countrycode, pa.statecode, pa.city, pa.zipcode, at.description as type FROM person_address_history pa LEFT JOIN address_types at ON at.id = pa.addresstype where pa.userid = ${req.personId} and pa.is_deleted = true`;
    }

    return this.db.query(sqlSmt);
  }

  public async getAddress(addressId: number): Promise<any> {
    return this.db.query(`
		SELECT pa.id, pa.pid, pa.address, pa.addresstype, pa.countrycode, pa.statecode, pa.city, pa.zipcode 
		FROM person_address pa 
		WHERE pa.id = ${addressId}	
		`);
  }

  public async createAddress(mode: string, personId: any): Promise<any> {
    const createDD = {
      addressTypeList: await this.db.query(`
				SELECT at.id, at.description 
				FROM address_types at
				where ${
          mode === "addForm"
            ? `at.id NOT IN (select pa.addresstype from person_address pa where pa.userid = ${personId})`
            : 1
        } 				
			`),
    };
    return createDD;
  }
}

export default PersonService;
