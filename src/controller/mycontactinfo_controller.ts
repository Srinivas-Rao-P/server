import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';
import MycontactinfoService from '../service/mycontactinfo/mycontactinfo.service';


class Person extends BaseController {
    private activityLogService: ActivityLogService;
    private mycontactinfoService: MycontactinfoService;
    constructor() {
        super();
        this.activityLogService = new ActivityLogService();
        this.mycontactinfoService = new MycontactinfoService();

    }

    public async getNames(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { personId } = req.params;
            const result = await this.mycontactinfoService.getNames(personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getAddress(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { personId } = req.params;
            const result = await this.mycontactinfoService.getAddress(personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getEmails(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { personId } = req.params;
            const result = await this.mycontactinfoService.getEmails(personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getPhones(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { personId } = req.params;
            const result = await this.mycontactinfoService.getPhones(personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
   
}

export default Person;