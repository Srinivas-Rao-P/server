import express from 'express';
import { BaseController } from './base_controller';
import ActivityLogService from '../service/activitylog/activitylog.service';

class ActivityController extends BaseController {
	private activityLogService: ActivityLogService;
	constructor() {
		super();
		this.activityLogService = new ActivityLogService();
	}

	public async getActivityLog(req: express.Request, res: express.Response): Promise<any> {		
		try {
			const result = await this.activityLogService.getActivityLog(req.body);
			res.send(this.getSuccessResponse(result[0]));
		}
		catch (error) {
			res.status(500).send((error));
		}
	}
}

export default ActivityController;