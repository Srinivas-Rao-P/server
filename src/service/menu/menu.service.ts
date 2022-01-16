import Database from '../database/database';

class MenuService {
	private db: Database;
	constructor() {
		this.db = new Database();
	}

	public async getMenuItems(): Promise<any> {

		return this.db.query(`
				SELECT 
					*
				FROM 
					menu as m
				WHERE
					1
			`)
	};
}

export default MenuService;