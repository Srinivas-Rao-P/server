import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';
import EmployeeService from '../service/employee/employee.service';
import UsersService from '../service/user/users';

class Employee extends BaseController {
	private activityLogService: ActivityLogService;
	private employeeService: EmployeeService;
	private usersService: UsersService;
	constructor() {
		super();
		this.activityLogService = new ActivityLogService();
		this.employeeService = new EmployeeService();
		this.usersService = new UsersService();
	}

	public async getEmployeesListByCompany(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			req.body.companyId = user;
			const result = await this.employeeService.getEmployee();
			res.send(this.getSuccessResponse({ data: result }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	public async getEmployee(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			req.body.companyId = user;
			const result = await this.employeeService.getEmployee();
			res.send(this.getSuccessResponse({ data: result }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	// public async addEmployee(req: express.Request, res: express.Response): Promise<any> {
	// 	try {
	// 		const user = req.user as any;
	// 		req.body.companyId = user.companyId;
	// 		req.body.userId = user.id;
	// 		const { address } = req.body;            

	// 		if (req.body.userName) {
	// 			const userExists = await this.usersService.ValidateUserName(req.body.userName);
	// 			if (userExists[0][0].Id > 0) {
	// 				return res.send(this.getSuccessResponse({ Message : 'UserName already exists.' }));
	// 			} else {					
	// 				let opUser = { } as any;
	// 				opUser = {
	// 					companyId : user.companyId,
	// 					email : req.body.email,
	// 					firstName : req.body.firstName,
	// 					lastName : req.body.lastName,
	// 					password : req.body.password,
	// 					phone : req.body.phone,
	// 					role_Id : req.body.role_Id,
	// 					userId : user.id,
	// 					userName : req.body.userName
	// 				};
	// 				const userResult = await this.usersService.signUpUser(opUser);
	// 				req.body.user_Id = userResult.insertId;
	// 				opUser.user_Id = userResult.insertId;
	// 				const passportResult = await this.usersService.createPassport(opUser);
	// 			}
	// 		}   

	// 		if (address && !req.body.address_Id && address.address1) {
	// 			address.userId = user.id;
	// 			const addressResult = await this.addressService.addAddress(address);
	// 			req.body.address_Id = addressResult.insertId;
	// 		}

	// 		const result = await this.employeeService.addEmployee(req.body);
	// 		const activity = await this.activityLogService.addActivityLog({
	// 			description: JSON.stringify(req.body),
	// 			module: 'Employee',
	// 			module_Id: result.insertId,
	// 			userId: req.body.userId,
	// 		});
	// 		res.send(this.getSuccessResponse({ id: result.insertId }));
	// 	} catch (error) {
	// 		res.status(500).send(this.getErrorResponse(error));
	// 	}
	// }
}

export default Employee;