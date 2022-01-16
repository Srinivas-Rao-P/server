import Database from '../database/database';
import PasswordService from './user.service';
// import {
// 	UserRequest
// } from '../user/user.interface';

class UserService {
	private db: Database;
	private databaseget: Database;
	private passwordService: PasswordService;
	constructor() {
		this.db = new Database();
		this.databaseget = new Database(true);
		this.passwordService = new PasswordService();
	}

	public async getUserDetailsByCompany(req: any): Promise<any> {
		return this.databaseget.query(`
			CALL getUserDetailsByCompany_snew( 
				${req.companyId},
				${req.role_Id ? req.role_Id : null},
				${req.type},
				${req.userName ? this.db.connection.escape(req.userName) : null},
				${req.firstName ? this.db.connection.escape(req.firstName) : null},
				${req.pageSize ? req.pageSize : 50},
				${req.pageIndex ? req.pageIndex : 0},
				${req.sortExpression ? this.db.connection.escape(req.sortExpression) : null},
				${req.sortDirection ? this.db.connection.escape(req.sortDirection) : null}
			)`
		);
	}

	public async getUserDetailsByUserId(userId: number): Promise<any> {
		return this.databaseget.query(`
			CALL getUserDetailsByUserId_snew( 
				${userId}
			)`
		);
	}

	public async ValidateUserName(userName: string): Promise<any> {
		return this.db.query(`
			CALL ValidateUserName_snew( 
				${this.db.connection.escape(userName)}
			)`
		);
	}

	public async getUserSearch(companyId:number,searchVal:string): Promise<any> {
		return this.databaseget.query(`
			SELECT 
				u.id, 
				u.username, 
				u.email, 
				u.firstName, 
				u.lastName, 
				u.profilePhoto, 
				u.provider, 
				u.password, 
				u.salt, 
				u.resetPasswordToken, 
				u.resetPasswordExpires, 
				u.company_Id, 
				u.address_Id, 
				u.businessName, 
				u.role_Id, 
				u.createdAt, 
				u.updatedUserId, 
				u.updatedAt, 
				u.createdUserId, 
				u.phone, 
				u.fax, 
				u.terminal_Id, 
				u.isDeleted, 
				u.startTime, 
				u.endTime
			FROM
				user as u
			Where 
				u.Company_Id = ${companyId} AND
				u.IsDeleted = 0 AND
				(u.Username LIKE  ${this.db.connection.escape(`${searchVal}%`)})
			
		`)
	};

	public async signUpUser(userRequest: any): Promise<any> {
		return this.db.query(`
			INSERT
				INTO
					user(
						Username, Email, FirstName, LastName, ProfilePhoto, Provider, Salt, ResetPasswordToken, 
						ResetPasswordExpires, Company_Id, Address_Id, BusinessName, Role_Id, CreatedAt, createdUserId, 
						Phone, Fax, Terminal_Id, StartTime, EndTime
					)
				VALUES(
					${userRequest.userName ? this.db.connection.escape(userRequest.userName) : null},
					${userRequest.email ? this.db.connection.escape(userRequest.email) : null},
					${userRequest.firstName ? this.db.connection.escape(userRequest.firstName) : null},
					${userRequest.lastName ? this.db.connection.escape(userRequest.lastName) : null},
					${userRequest.profilePhoto ? this.db.connection.escape(userRequest.profilePhoto) : null},
					${userRequest.provider ? this.db.connection.escape(userRequest.provider) : null},
					${userRequest.salt ? this.db.connection.escape(userRequest.salt) : null},
					${userRequest.resetPasswordToken ? this.db.connection.escape(userRequest.resetPasswordToken) : null},
					${userRequest.resetPasswordExpires ? this.db.connection.escape(userRequest.resetPasswordExpires) : null},
					${userRequest.companyId ? userRequest.companyId : null},
					${userRequest.address_Id ? userRequest.address_Id : null},
					${userRequest.businessName ? this.db.connection.escape(userRequest.businessName) : null},
					${userRequest.role_Id ? userRequest.role_Id : null},
					UTC_TIMESTAMP,
					${userRequest.userId ? userRequest.userId : null},
					${userRequest.phone ? this.db.connection.escape(userRequest.phone) : null},
					${userRequest.fax ? this.db.connection.escape(userRequest.fax) : null},
					${userRequest.terminal_Id ? userRequest.terminal_Id : null},
					${userRequest.startTime ? this.db.connection.escape(userRequest.startTime) : null},
					${userRequest.endTime ? this.db.connection.escape(userRequest.endTime) : null}
				)
		`);
	}

	public async updateUser(userRequest: any): Promise<any> {
		let text = '';
		const userFields:any = [
			'username', 
			'email', 
			'firstName', 
			'lastName', 
			'profilePhoto', 
			'provider', 
			'password', 
			'salt', 
			'resetPasswordToken', 
			'resetPasswordExpires', 
			'company_Id', 
			'address_Id', 
			'businessName', 
			'role_Id', 
			'updatedUserId', 
			'updatedAt', 
			'phone', 
			'fax', 
			'terminal_Id', 
			'isDeleted', 
			'startTime', 
			'endTime'
		]
		Object.keys(userRequest).map((key) => {
			if (userFields.indexOf(key) > -1) {
				if (typeof userRequest[key] === 'string') {
					// tslint:disable-next-line: prefer-template
					text += key + '="' + `${userRequest[key]}` + '",';
				} else {
					// tslint:disable-next-line: prefer-template
					text += key + '=' + `${userRequest[key]}` + ',';
				}
			}
		});
		if (text && userRequest.user_Id) {
			text += ` UpdatedAt=UTC_TIMESTAMP, updateduserId = ${userRequest.userId}`;
			return this.db.query(`
			UPDATE
				user
			SET
				${text} 
			WHERE
				Id = ${userRequest.user_Id}
		`);
		} else {
			return null
		}
	}

	// public async createPassport(passportRequest: any): Promise<any> {
	// 	const passowordVerify = this.passwordService.generateHash(passportRequest.password);
	// 	return this.db.query(`
	// 		INSERT
	// 			INTO
	// 				passport(
	// 					protocol, password, provider, identifier, user_id,
	// 					createdAt,createdUserId
	// 				)
	// 			VALUES(
	// 				'local',
	// 				${this.db.connection.escape(passowordVerify)},
	// 				'local',
	// 				'admin',
	// 				${passportRequest.user_Id},
	// 				UTC_TIMESTAMP,
	// 				${passportRequest.userId ? passportRequest.userId : null}
	// 			)
	// 	`);
	// }

	// public async updatePassport(passportRequest: any): Promise<any> {
	// 	const passowordVerify = this.passwordService.generateHash(passportRequest.Password);
	// 	return this.db.query(`
	// 		UPDATE
	// 			passport
	// 		SET
	// 			protocol = 'local',
	// 			password = ${this.db.connection.escape(passowordVerify)},
	// 			provider =	'local',
	// 			identifier = 'admin',
	// 			user_id	= ${passportRequest.Id},
	// 			updatedAt =	UTC_TIMESTAMP,
	// 			updatedUserId = ${passportRequest.UpdatedUserId ? passportRequest.UpdatedUserId : null}
	// 		WHERE
	// 			user_id = ${passportRequest.Id}
				
	// 	`);
	// }
}

export default UserService;