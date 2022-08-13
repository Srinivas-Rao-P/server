import express from 'express';
import { BaseController } from './base_controller';
import HistoryService from '../service/history/history.service';


class History extends BaseController {
    private historyService: HistoryService;
    constructor() {
        super();
        this.historyService = new HistoryService();
    }


    public async deleteRecord(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            console.log(req);
            
            await this.historyService.deleteRecord(req.body)
            res.send(this.getSuccessResponse({ message: 'Record deleted' }));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getHistory(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            
            const result = await this.historyService.getHistory(req.body)
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
}

export default History;