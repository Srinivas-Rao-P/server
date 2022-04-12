import Database from '../database/database';

class EmployeeService {
	private db: Database;
	private databaseget: Database;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
	}

	// public async addEmployee(req: any): Promise<any> {
	// 	return this.db.query(`
	// 		INSERT
	// 			INTO
	// 				employee(
	// 					FirstName, LastName, YearsOfExperience, DateOfBirth, SocialNumber, Phone, Email, Address_Id, createdAt, 
	// 					Salary, PreviousEmployer, PreviousEmployerPhone, User_Id, EmergencyContactName1, EmergencyContactPhone1, 
	// 					EmergencyContactName2, EmergencyContactPhone2, Company_Id, createdUserId, JoinedDate, HourlyRate,subcompany_Id
	// 				)
	// 			VALUES(
	// 				'${req.firstName ? req.firstName : ''}',
	// 				'${req.lastName ? req.lastName : ''}',
	// 				${req.yearsOfExperience ? req.yearsOfExperience : null},
	// 				'${req.dateOfBirth ? req.dateOfBirth : ''}',
	// 				'${req.socialNumber ? req.socialNumber : ''}',
	// 				'${req.phone ? req.phone : ''}',
	// 				'${req.email ? req.email : ''}',
	// 				${req.address_Id ? req.address_Id : null},
	// 				UTC_TIMESTAMP,
	// 				${req.salary ? req.salary : null},
	// 				'${req.previousEmployer ? req.previousEmployer : ''}',
	// 				'${req.previousEmployerPhone ? req.previousEmployerPhone : ''}',
	// 				${req.user_Id ? req.user_Id : null},
	// 				'${req.emergencyContactName1 ? req.emergencyContactName1 : ''}',
	// 				'${req.emergencyContactPhone1 ? req.emergencyContactPhone1 : ''}',
	// 				'${req.emergencyContactName2 ? req.emergencyContactName2 : ''}',
	// 				'${req.emergencyContactPhone2 ? req.emergencyContactPhone2 : ''}',
	// 				${req.companyId ? req.companyId : null},
	// 				${req.userid ? req.userid : null},
	// 				'${req.joinedDate ? req.joinedDate : ''}',
	// 				${req.hourlyRate ? req.hourlyRate : null},
	// 				${req.subCompany_Id ? req.subCompany_Id : null}
	// 			)				
	// 	`);
	// }
	public async getEmployee(): Promise<any> {

		return this.db.query(`
				SELECT 
					*
				FROM 
					users as u
				WHERE
					1
			`)
	};

	public async manageEmployee(managerId: string): Promise<any> {

		return this.db.query(`
			select 
				c.id, p.firstname , p.lastname, p.imageurl , c.designation, c.date as hiredate, cs.status  
			from 
				profile p 
			join 
				candidates c on p.userid = c.id 
			join
				candidatestatus cs on c.status = cs.id
			where 
				c.managerid = ${managerId} order by cs.status desc
		`)
	};
}

export default EmployeeService;