import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';
import EmergencycontactService from '../service/emergencycontact/emergencycontact.service';
import UsersService from '../service/user/users';

class Emergencycontact extends BaseController {
    private activityLogService: ActivityLogService;
    private emergencycontactService: EmergencycontactService;
    private usersService: UsersService;
    constructor() {
        super();
        this.activityLogService = new ActivityLogService();
        this.emergencycontactService = new EmergencycontactService();
        this.usersService = new UsersService();
    }

    public async addEmergencyContact(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.emergencycontactService.addEmergencyContact(personId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getEmergencyContact(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { emergencyContactId } = req.params;
            const { personId } = req.params;
            const list = await this.emergencycontactService.getEmergencyContact(Number(emergencyContactId));
            const createDD = await this.emergencycontactService.create('editForm', personId);
            const result = {
                list: list[0],
                relationshipList: createDD.relationshipList
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateEmergencyContact(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.emergencycontactService.updateEmergencyContact(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getEmergencyContactList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            req.body.personId = personId;
            const list = await this.emergencycontactService.getEmergencyContactList(req.body);
            const canAddEmergencyContact = await this.emergencycontactService.create('addForm', personId);
            const result = {
                list,
                canAddEmergencyContact: canAddEmergencyContact.relationshipList.length > 0
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async create(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.emergencycontactService.create('editForm', personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
}

export default Emergencycontact;