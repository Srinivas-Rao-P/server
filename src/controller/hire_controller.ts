import express from 'express';
import { BaseController } from './base_controller';
import NewhireService from '../service/hire/newhire.service';
import CandidateService from '../service/candidate/candidate.service';
import PersonService from '../service/person/person.service';
import UserService from '../service/user/user.service';
import ProfileService from '../service/profile/profile.service';


class Newhire extends BaseController {
    private newhireService: NewhireService;
    private candidateService: CandidateService;
    private personService: PersonService;
    private userService: UserService;
    private profileService: ProfileService;
    constructor() {
        super();
        this.newhireService = new NewhireService();
        this.candidateService = new CandidateService();
        this.personService = new PersonService();
        this.userService = new UserService();
        this.profileService = new ProfileService();
    }


    public async newHire(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            
            const candidate = await this.candidateService.addCandidate(req.body)
            
            await this.personService.addName(req.body, candidate.insertId)
            await this.personService.addAddress(req.body, candidate.insertId)
            await this.personService.addPhone(req.body, candidate.insertId)
            await this.personService.addEmail(req.body, candidate.insertId)
            await this.userService.createUser(req.body.username, candidate.insertId)
            await this.profileService.createProfile(req.body, candidate.insertId)
            // const newhire = await this.newhireService.getNewhireItems(user);
            // newhire.subNewhire = await this.newhireService.getSubNewhire(user, 5);
            res.send(this.getSuccessResponse(candidate.insertId));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }

}

export default Newhire;