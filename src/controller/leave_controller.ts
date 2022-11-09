import express from 'express';
import { BaseController } from './base_controller';
import LeaveService from '../service/leave/leave.service';


class Leave extends BaseController {
    private leaveService: LeaveService;
    constructor() {
        super();
        this.leaveService = new LeaveService();
    }


    public async getLeaveTypeList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.leaveService.getLeaveTypeList();
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getLeaveType(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { leaveTypeId } = req.params;
            const result = await this.leaveService.getLeaveType(leaveTypeId);
            res.send(this.getSuccessResponse(result[0]));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async addLeaveType(req: express.Request, res: express.Response): Promise<any> {
        try {
            const result = await this.leaveService.addLeaveType(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateLeaveType(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { leaveTypeId } = req.params;
            const result = await this.leaveService.updateLeaveType(leaveTypeId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

}

export default Leave;