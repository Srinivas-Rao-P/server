import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';
import BankService from '../service/bank/bank.service';
import UsersService from '../service/user/users';

class Bank extends BaseController {
    private activityLogService: ActivityLogService;
    private bankService: BankService;
    private usersService: UsersService;
    constructor() {
        super();
        this.activityLogService = new ActivityLogService();
        this.bankService = new BankService();
        this.usersService = new UsersService();
    }

    public async addBank(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.bankService.addBank(personId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateBank(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.bankService.updateBank(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getBankList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId, showDeletedRecords } = req.params;
            req.body.personId = personId;
            const list = await this.bankService.getBankList(req.body, showDeletedRecords);

            list.forEach((v: any) => {
                v.accountnumber = v.accountnumber.slice(0, -4).replace(/./g, "*") + ('' + v.accountnumber).slice(-4);
            });

            const canAddBank = await this.bankService.create('addForm', personId);
            const result = {
                list,
                canAddBank: canAddBank.bankaccounttypes.length > 0
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getBankData(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { bankId } = req.params;
            const { personId } = req.params;
            const list = await this.bankService.getBankData(Number(bankId));
            const createDD = await this.bankService.create('editForm', personId);
            const result = {
                list: list[0],
                bankaccounttypes: createDD.bankaccounttypes
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
            const result = await this.bankService.create('addForm', personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async validateAccountNumber(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { accountnumber } = req.params;
            const result = await this.bankService.validateAccountNumber(Number(accountnumber));
            res.send(this.getSuccessResponse({ isAccountNumberValid: result.length > 0 }));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
}

export default Bank;