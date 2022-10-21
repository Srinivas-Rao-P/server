import express from 'express';
import { BaseController } from './base_controller';
import NewhireService from '../service/hire/newhire.service';
import CandidateService from '../service/candidate/candidate.service';
import PersonService from '../service/person/person.service';
import UserService from '../service/user/user.service';
import ProfileService from '../service/profile/profile.service';
import MycontactinfoService from '../service/mycontactinfo/mycontactinfo.service';


class Newhire extends BaseController {
    private newhireService: NewhireService;
    private candidateService: CandidateService;
    private personService: PersonService;
    private userService: UserService;
    private profileService: ProfileService;
    private mycontactinfoService: MycontactinfoService;
    constructor() {
        super();
        this.newhireService = new NewhireService();
        this.candidateService = new CandidateService();
        this.personService = new PersonService();
        this.userService = new UserService();
        this.profileService = new ProfileService();
        this.mycontactinfoService = new MycontactinfoService();
    }


    public async newHire(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            
            const candidate = await this.candidateService.addCandidate(req.body)
            req.body.nametype = 8;
            req.body.phonecontacttype = 3;           
            req.body.addresstype = 6;
            await this.mycontactinfoService.addName(candidate.insertId, req.body)
            await this.mycontactinfoService.addAddress(candidate.insertId, req.body)
            req.body.countrycode = 91;
            await this.mycontactinfoService.addPhone(candidate.insertId, req.body)
            await this.mycontactinfoService.addEmail(candidate.insertId, req.body)
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