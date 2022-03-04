import express from 'express';
import { BaseController } from './base_controller';
import nodemailer from 'nodemailer';
// import ActivityLogService from '../service/activitylog/activitylog.service';
import EmailService from '../service/email/email.service';


class Email extends BaseController {
    // private activityLogService: ActivityLogService;
    private emailService: EmailService;

    constructor() {
        super();
        // this.activityLogService = new ActivityLogService();
        this.emailService = new EmailService();

    }

    public async sendEmail(req: express.Request, res: express.Response): Promise<any> {
        try {
            const user = req.user as any;
            req.body.userid = user.id;
            const result = await this.emailService.getCandidateDataById(req.body.id);
            req.body.link = result[0].link;
            await transporter.sendMail(mailBody(req.body), (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(this.getErrorResponse(err));
                }
                else {
                    console.log(info);
                    res.send(this.getSuccessResponse({ message: 'mail sent successfully' }));
                }
            });

            res.send(this.getSuccessResponse({ message: 'mail sent successfully' }));
        }
        catch (e) {
            res.status(500).send(this.getErrorResponse(e));
        }
    }
}

export default Email;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'vp.srinivasrao@gmail.com',
        pass: '8197279373',
    },
    secure: true,
});

const mailBody = (body: any) => {
    return {
        from: process.env.fromEmail,  // sender address
        // to: body.to,   // list of receivers
        to: body.email,   // list of receivers
        subject: 'Registration Form',
        // text: 'That was easy!',
        html: registrationForm(body)
    }
}

const registrationForm = (result: any) => {
	let htmlString ='';
	htmlString += `click <a href="http://localhost:8080/candidatelogin/${result.id}/${result.link}">here</a> to login `;
	
	return htmlString;
};
