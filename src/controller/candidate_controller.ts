import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';
import CandidateService from '../service/candidate/candidate.service';
import ProfileService from '../service/profile/profile.service';
import UsersService from '../service/user/users';

class Candidate extends BaseController {
    private activityLogService: ActivityLogService;
    private candidateService: CandidateService;
    private profileService: ProfileService;
    private usersService: UsersService;
    constructor() {
        super();
        this.activityLogService = new ActivityLogService();
        this.candidateService = new CandidateService();
        this.profileService = new ProfileService();
        this.usersService = new UsersService();
    }

    public async addCandidate(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            
            const result = await this.candidateService.addCandidate(req.body);
            req.body.candidateid = result.insertId;
            
            await this.profileService.createProfile(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async updateCandidate(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.candidateService.updateCandidate(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getCandidateList(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.candidateService.getCandidateList(req.body);
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async getCandidateData(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { candidateId } = req.params;
            const result = await this.candidateService.getCandidateData(Number(candidateId));
            res.send(this.getSuccessResponse(result[0]));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

    public async create(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.candidateService.create();
            res.send(this.getSuccessResponse(result));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
}

export default Candidate;