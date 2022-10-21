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

    public async addPhone(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.addPhone(personId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updatePhone(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.mycontactinfoService.updatePhone(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getPhoneList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId, showDeletedRecords } = req.params;
            req.body.personId = personId;
            const list = await this.mycontactinfoService.getPhoneList(req.body, showDeletedRecords);
            const canAddPhone = await this.mycontactinfoService.createPhone('addForm', personId);
            const result = {
                list,
                canAddPhone: canAddPhone.phoneContactTypeList.length > 0
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getPhoneContact(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { phoneId } = req.params;
            const { personId } = req.params;
            const list = await this.mycontactinfoService.getPhoneContact(Number(phoneId));
            const createDD = await this.mycontactinfoService.createPhone('editForm', personId);
            const result = {
                list: list[0],
                phoneContactTypeList: createDD.phoneContactTypeList
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async createPhone(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.createPhone('addForm', personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getNameList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId, showDeletedRecords } = req.params;
            req.body.personId = personId;
            const list = await this.mycontactinfoService.getNameList(req.body, showDeletedRecords);
            const canAddName = await this.mycontactinfoService.createName('addForm', personId);
            const result = {
                list,
                canAddName: canAddName.nameTypeList.length > 0
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async createName(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.createName('addForm', personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async addName(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.addName(personId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getName(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { phoneId } = req.params;
            const { personId } = req.params;
            const list = await this.mycontactinfoService.getName(Number(phoneId));
            const createDD = await this.mycontactinfoService.createName('editForm', personId);
            const result = {
                list: list[0],
                nameTypeList: createDD.nameTypeList
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateName(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.mycontactinfoService.updateName(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getAddressList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId, showDeletedRecords } = req.params;
            req.body.personId = personId;
            const list = await this.mycontactinfoService.getAddressList(req.body, showDeletedRecords);
            const canAddAddress = await this.mycontactinfoService.createAddress('addForm', personId);
            const result = {
                list,
                canAddAddress: canAddAddress.addressTypeList.length > 0
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async createAddress(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.createAddress('addForm', personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async addAddress(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.addAddress(personId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getAddress(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { phoneId } = req.params;
            const { personId } = req.params;
            const list = await this.mycontactinfoService.getAddress(Number(phoneId));
            const createDD = await this.mycontactinfoService.createAddress('editForm', personId);
            const result = {
                list: list[0],
                addressTypeList: createDD.addressTypeList
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateAddress(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.mycontactinfoService.updateAddress(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    
    public async getEmailList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId, showDeletedRecords } = req.params;
            req.body.personId = personId;
            const list = await this.mycontactinfoService.getEmailList(req.body, showDeletedRecords);
            const canAddEmail = await this.mycontactinfoService.createEmail('addForm', personId);
            const result = {
                list,
                canAddEmail: canAddEmail.emailTypeList.length > 0
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async createEmail(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.createEmail('addForm', personId);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async addEmail(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const { personId } = req.params;
            const result = await this.mycontactinfoService.addEmail(personId, req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getEmail(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { emailId } = req.params;
            const { personId } = req.params;
            const list = await this.mycontactinfoService.getEmail(Number(emailId));
            const createDD = await this.mycontactinfoService.createEmail('editForm', personId);
            const result = {
                list: list[0],
                emailTypeList: createDD.emailTypeList
            }
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateEmail(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.mycontactinfoService.updateEmail(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

   
}

export default Person;