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
			const menu = await this.menuService.getMenuItems(user);
			menu.subMenu = await this.menuService.getSubMenu(user, 5);
			res.send(this.getSuccessResponse(menu));
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

	public async addMainMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			
			await this.menuService.addMainMenu(req.body);
			res.send(this.getSuccessResponse({ message: 'Menu added successfully' }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	public async addSubMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			const { menuId } = req.params;
			await this.menuService.addSubMenu(req.body, menuId);
			res.send(this.getSuccessResponse({ message: 'Menu added successfully' }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	public async updateMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;
			await this.menuService.updateMenu(req.body);
			res.send(this.getSuccessResponse({ message: 'Menu added successfully' }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}

	public async updateSubMenu(req: express.Request, res: express.Response): Promise<any> {
		try {
			const user = req.user as any;			
			const { menuId } = req.params;
			
			await this.menuService.updateSubMenu(req.body, menuId);
			res.send(this.getSuccessResponse({ message: 'Menu added successfully' }));
		}
		catch (e) {
			res.status(500).send(this.getErrorResponse(e));
		}
	}
}

export default Menu;