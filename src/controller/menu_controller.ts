import express from 'express';
import { BaseController } from './base_controller';
import MenuService from '../service/menu/menu.service';


class Menu extends BaseController {
	private menuService: MenuService;
	constructor() {
		super();
		this.menuService = new MenuService();
	}


	public async getMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			const menu = await this.menuService.getMenu(user);

			for (const eachMenu of menu) {							
				eachMenu.submenu = await this.menuService.getSubmenu(user, eachMenu.id)
			}
			
			res.send(this.getSuccessResponse(menu));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	public async saveMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
            req.body.userid = user.id;

			for (const submenu of req.body.submenu) {		
				await this.menuService.saveSubmenu(submenu.id, submenu);
			  }
			await this.menuService.saveMenu(req.body);

			

			res.send(this.getSuccessResponse({ message: 'Menu saved successfully' }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

}

export default Menu;