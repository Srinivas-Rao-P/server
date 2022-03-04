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
			const result = await this.menuService.getMenuItems(user);
			res.send(this.getSuccessResponse(result));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	public async getSubMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			
			const result = await this.menuService.getSubMenu(user, req.body.menuId);
			res.send(this.getSuccessResponse(result));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}
}

export default Menu;