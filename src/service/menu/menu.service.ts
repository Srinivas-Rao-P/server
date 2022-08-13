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

	public async addMainMenu(req: any): Promise<any> {
		console.log(req);
		
		return this.db.query(`
			INSERT INTO menu(name, description, icon, link, userrole) 
			VALUES ('${req.name}', '${req.description}', '${req.icon}', '${req.link}', '${req.userrole}')
		`)
	};

	public async addSubMenu(req: any, menuId: any): Promise<any> {
		console.log(req);

		return this.db.query(`
			UPDATE menu m SET submenu = ${req} WHERE m.id = ${menuId}
		`)
	};

	public async updateMenu(req: any): Promise<any> {
		let text = '';
		const fields: any = [
			'name',
			'description',
			'icon',
			'link',
			'userrole',
			'submenu'
		];
		Object.keys(req).map((key) => {
			if (fields.indexOf(key) > -1) {
				if (typeof req[key] === 'string') {
					text += key + '="' + `${req[key]}` + '",';
				} else {
					text += key + '=' + `${req[key]}` + ',';
				}
			}
		});

		if (text && req.id) {
			text += ` updatedat = UTC_TIMESTAMP, updateduserid = ${req.userid}`;
			return this.db.query(`
				Update menu
			SET
				${text}
			WHERE
				id = ${req.id}
		 	`);
		} else {
			return null
		}
	};

	public async updateSubMenu(req: any, menuId: any): Promise<any> {
		console.log(`
		Update menu m
	SET
		m.submenu = ${JSON.stringify(req)}					
	WHERE
		m.id = ${menuId}
	 `);

		return this.db.query(`
				Update menu m
			SET
				m.submenu = '${JSON.stringify(req)}'			
			WHERE
				m.id = ${menuId}
		 	`);

	};
}

export default MenuService;