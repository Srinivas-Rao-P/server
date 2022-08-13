import express from 'express';
import { BaseController } from './base_controller';
import ManageuserrolesService from '../service/user/manageuserroles.service';


class Manageuserroles extends BaseController {
    private manageuserrolesService: ManageuserrolesService;
    constructor() {
        super();
        this.manageuserrolesService = new ManageuserrolesService();
    }


    public async getUsers(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            const result = await this.manageuserrolesService.getUsers();
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getUserroles(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            const { personId } = req.params
            const result = await this.manageuserrolesService.getUserroles(personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async addUserrole(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            const { personId } = req.params
            await this.manageuserrolesService.addUserrole(personId, req.body.roleId);
            res.send(this.getSuccessResponse({ message: 'User Role updated successfully' }));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async removeUserrole(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            const { personId } = req.params
            await this.manageuserrolesService.removeUserrole(personId, req.body.roleId);
            res.send(this.getSuccessResponse({ message: 'User Role updated successfully' }));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

}

export default Manageuserroles;