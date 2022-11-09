import Database from "../database/database";

class PersonService {
  private db: Database;
  private databaseget: Database;
  constructor() {
    this.db = new Database();
    this.databaseget = new Database(true);
  }

  public async getProfile(personId: string): Promise<any> {
    return this.db.query(`
		SELECT 
			p.imageurl, ppc.phoneno, pn.name, pn.fname, pn.mname, pn.lname, pnc.email, pa.address,pa.countrycode, pa.city, pa.statecode, pa.zipcode, p.dateofbirth, p.gender, c.designation 
		FROM profile as p
			left JOIN person_phone_contacts ppc on ppc.userid = p.candidateid  
			left join person_names pn on pn.userid = p.candidateid  
			left join person_net_contacts pnc on pnc.userid = p.candidateid 
			left join person_address pa on pa.userid = p.candidateid 
			left join candidates c on c.id = p.candidateid
		WHERE
			p.candidateid = ${personId} and pnc.netcontacttype = 1
		`);
  }
  public async saveProfile(req: any): Promise<any> {
    let text = "";
    const fields: any = [
      "imageurl",
      "firstname",
      "lastname",
      "phone",
      "email",
      "address",
      "city",
      "state",
      "zipcode",
      "nationality",
      "dateofbirth",
      "gender",
    ];
    Object.keys(req).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof req[key] === "string") {
          // tslint:disable-next-line: prefer-template
          text += key + '="' + `${req[key]}` + '",';
        } else {
          // tslint:disable-next-line: prefer-template
          text += key + "=" + `${req[key]}` + ",";
        }
      }
    });
    if (text && req.personId) {
      // text += ` UpdatedAt = UTC_TIMESTAMP, updatedUserId = ${req.personId}`;
      text += `updateduserid = ${req.personId}`;
      console.log(text);

      return this.db.query(`
					UPDATE
						profile
					SET
						${text}
					WHERE
						userid = '${req.personId}'
				`);
    } else {
      return null;
    }
  }

  // public async addEmail(req: any, personId: string): Promise<any> {
  // 	return this.db.query(`
  // 		INSERT INTO person_net_contacts(id, netcontacttype, email)
  // 		VALUES (
  // 			'${personId}',
  // 			'${req.netcontacttype}',
  // 			'${req.email}'
  // 		)
  // 	`)
  // };

  // public async addName(req: any, personId: string): Promise<any> {
  // 	return this.db.query(`
  // 		INSERT INTO person_names(id, name, fname, mname, lname, nameevent, nametype)
  // 		VALUES (
  // 			'${personId}',
  // 			'${req.firstname +' '+ req.middlename +' '+ req.lastname}',
  // 			'${req.firstname}',
  // 			'${req.middlename}',
  // 			'${req.lastname}',
  // 			1,8
  // 		)
  // 	`)
  // };

  // public async addAddress(req: any, personId: string): Promise<any> {
  // 	return this.db.query(`
  // 		INSERT INTO person_address(personid, address, countrycode, city, statecode, zipcode)
  // 		VALUES (
  // 			'${personId}',
  // 			'${req.address}',
  // 			'${req.countrycode}',
  // 			'${req.city}',
  // 			'${req.statecode}',
  // 			'${req.zipcode}'
  // 		)
  // 	`)
  // };

  // public async addPhone(req: any, personId: string): Promise<any> {
  // 	return this.db.query(`
  // 		INSERT INTO person_phone_contacts(userid, phoneno)
  // 		VALUES (
  // 			'${personId}',
  // 			'${req.phone}'
  // 		)
  // 	`)
  // };

  public async getPersonInfo(personId: string): Promise<any> {
    return this.db.query(`
		SELECT pn.name, pn.fname, pn.lname, pn.mname, 
		(select email from person_net_contacts pnc where netcontacttype = 1 and pnc.userid = ${personId}) as email
		FROM person_names pn
		where pn.userid = ${personId}
		`);
  }
}

export default PersonService;
