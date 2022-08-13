import express from 'express';
import { BaseController } from './base_controller';
import UserService from '../service/user/user.service';
import AuthService from '../service/auth/auth.service';

class ActivityController extends BaseController {
	private userService: UserService;
	private authService: AuthService;
	constructor() {
		super();
		this.userService = new UserService();
		this.authService = new AuthService();
	}

	public async login(req: express.Request, res: express.Response): Promise<any> {
		try {

			const users = await this.userService.findUser(req.body.username);
			const user = users && users.length ? users[0] : null;


			if (user) {

				const validatePassword = await this.userService.validatePassword(user.username, req.body.password)
				const validPassword = validatePassword && validatePassword.length ? true : null;

				if (validPassword) {
					const result = await this.authService.login(user);
					res.send(this.getSuccessResponse({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
				}
				else {
					res.send(this.getSuccessResponse({ message: 'Incorrect password' }));
				}
			}
			else {
				res.send(this.getSuccessResponse({ message: 'User not found.' }));
			}
		}
		catch (error) {
			res.status(500).send(error);
		}
	}
	public async candidateLogin(req: express.Request, res: express.Response): Promise<any> {
		try {

			const users = await this.userService.findCandidate(req.body);
			const user = users && users.length ? users[0] : null;

			if (user) {
				// validate token
				const validateToken = await this.userService.verifyToken(req.body.token);

				if (validateToken) {
					const result = await this.authService.candidateLogin(req.body);
					res.send(this.getSuccessResponse({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
				}
				else {
					res.send(this.getSuccessResponse({ message: 'Incorrect password' }));
				}
			}
			else {
				res.send(this.getSuccessResponse({ message: 'User not found.' }));
			}
		}
		catch (error) {
			res.status(500).send(error);
		}
	}

	public async refreshToken(req: express.Request, res: express.Response): Promise<any> {
		try {
			const refreshToken = req.body.token
			const refreshTokens = await this.userService.findUserByToken(refreshToken);

			if (refreshToken == null) return res.sendStatus(401)

			if (!refreshTokens.some((item: any) => item.token === refreshToken)) return res.sendStatus(403)

			const result = await this.authService.refreshToken(refreshToken);
			res.send(this.getSuccessResponse({ accessToken: result.accessToken }));
		}
		catch (error) {
			res.status(500).send(error);
		}
	}

	public async register(req: express.Request, res: express.Response): Promise<any> {
		try {
			const users = await this.userService.findUser(req.body.username);
			const user = users && users.length ? users[0] : null;
			if (user) {
				res.send(this.getSuccessResponse({ message: 'Username already exists.' }));
			} else {
				const result = await this.authService.register(req.body);
				res.send(this.getSuccessResponse({ id: result.insertId, message: 'Register successfull' }));
			}
		}
		catch (error) {
			res.status(500).send(error);
		}
	}

	public async generateOtp(req: express.Request, res: express.Response): Promise<any> {
		try {
			const validateUser = await this.authService.validateUser(req.body.username);
			if (validateUser) {
				await this.authService.generateOtp(validateUser[0].id);
				res.send(this.getSuccessResponse({ message: 'Otp sent successfull' }));
			} else {
				res.send(this.getSuccessResponse({ message: 'User name invalid' }));
			}
		}
		catch (error) {
			res.status(500).send(error);
		}
	}

	public async verifyOtp(req: express.Request, res: express.Response): Promise<any> {
		try {
			const validateOtp = await this.authService.verifyOtp(req.body);
			const validOtp = validateOtp && validateOtp.length ? true : null;

			if (validOtp) {
				res.send(this.getSuccessResponse({ id: true, message: 'Otp verified' }));
			} else {
				res.sendStatus(400)				
			}
		}
		catch (error) {
			res.status(500).send(error);
		}
	}

	public async resetPassword(req: express.Request, res: express.Response): Promise<any> {
		try {

			const validateOtp = await this.authService.verifyOtp(req.body);

			const validOtp = validateOtp && validateOtp.length ? true : null;
			if (validOtp) {

				await this.authService.resetPassword(req.body);
				res.send(this.getSuccessResponse({ message: 'Password changed successfully' }));
			} else {
				res.send(this.getErrorResponse(Error('OTP invalid/expired'), 400));
			}
		}
		catch (error) {
			res.status(500).send(error);
		}
	}

	public async logout(req: express.Request, res: express.Response): Promise<any> {
		try {
			const result = await this.authService.logout(req.body.token);
			res.send(this.getSuccessResponse({ id: result.insertId, message: 'Logged out successfully' }));
		}
		catch (error) {
			res.status(500).send(error);
		}
	}
}

export default ActivityController;