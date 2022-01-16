import express from 'express';
import { BaseController } from './base_controller';
import MenuService from '../service/menu/menu.service';


class Menu extends BaseController {
	private menuService: MenuService;
	constructor() {
		super();
		this.menuService = new MenuService();
	}



	public async getMenuItems(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			req.body.companyId = user;
			const result = await this.menuService.getMenuItems();
			res.send(this.getSuccessResponse(result));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

}

export default Menu;