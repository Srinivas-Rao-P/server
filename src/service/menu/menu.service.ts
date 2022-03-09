import Database from '../database/database';

class MenuService {
	private db: Database;
	constructor() {
		this.db = new Database();
	}

	public async getMenuItems(user: any): Promise<any> {
		return this.db.query(`
			select m.id, m.name, m.description, m.icon, m.link, m.userrole, m.submenu, s.id AS submenuid
			FROM menu m 
			LEFT JOIN submenu s ON m.id = s.menuid			
			where m.userrole LIKE '%${user.userRole}%'
			GROUP BY m.name
			ORDER BY m.orderid ASC
		`)
	};

	public async getSubMenu(user: any, menuId: number): Promise<any> {
		return this.db.query(`
			select s.name, s.description, s.icon, s.link
			FROM submenu s 
            WHERE s.userrole LIKE '%${user.userRole}%' 
            AND s.menuid = ${menuId}
			GROUP BY s.name
			ORDER BY s.orderid ASC
		`)
	};
}

export default MenuService;