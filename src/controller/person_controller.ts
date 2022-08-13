import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';
import PersonService from '../service/person/person.service';
import UsersService from '../service/user/users';

class Person extends BaseController {
    private activityLogService: ActivityLogService;
    private personService: PersonService;
    private usersService: UsersService;
    constructor() {
        super();
        this.activityLogService = new ActivityLogService();
        this.personService = new PersonService();

    }

    public async getProfile(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { personId } = req.params;
            const result = await this.personService.getProfile(personId);
            res.send(this.getSuccessResponse(result[0]));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
    public async saveProfile(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { personId } = req.params;
			req.body.personId = personId;
            const result = await this.personService.saveProfile(req.body);
            res.send(this.getSuccessResponse({ message: "Profile updated" }));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
    // public async addEmail(req: express.Request, res: express.Response): Promise<any> {
    //     try {
    //         const { personId } = req.params;
	// 		req.body.personId = personId;
    //         const result = await this.personService.saveProfile(req.body);
    //         res.send(this.getSuccessResponse({ message: "Profile updated" }));
    //     }
    //     catch (e) {
    //         res.status(500).send(this.getErrorResponse(e));
    //     }
    // }
}

export default Person;