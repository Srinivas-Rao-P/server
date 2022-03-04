import Database from '../database/database';

class MenuService {
	private db: Database;
	constructor() {
		this.db = new Database();
	}

	public async getMenuItems(user: any): Promise<any> {
		return this.db.query(`
			select m.name, m.description, m.icon, m.link 
			FROM menu m 
			where m.userrole LIKE '%${user.userRole}%' 
			AND m.companyid = ${user.companyId}
			`)
	};

	public async getSubMenu(user: any, menuId: number): Promise<any> {
		return this.db.query(`
			select s.name, s.description, s.icon, s.link
			FROM submenu s 
            WHERE s.userrole LIKE '%${user.userRole}%' 
            AND s.menuid = ${menuId}
            AND s.companyid  = ${user.companyId}
			`)
	};
}

export default MenuService;