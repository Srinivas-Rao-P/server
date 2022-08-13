import express from 'express';
import { BaseController } from './base_controller';
import TimeService from '../service/time/time.service';

class Bank extends BaseController {
    private timeService: TimeService;
    constructor() {
        super();
        this.timeService = new TimeService();
    }

    public async getCompanyTimeOffList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.timeService.getCompanyTimeOffList();
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
}

export default Bank;