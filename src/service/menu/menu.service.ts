import Database from "../database/database";

class MenuService {
  private db: Database;
  constructor() {
    this.db = new Database();
  }

  public async getMenu(user: any): Promise<any> {
    return this.db.query(`
			select m.id, m.name, m.description, m.icon, m.link, m.userrole, '[]' as submenu
			FROM menu m 			
			where m.showmenu = 1 and m.userrole LIKE '%${user.userRole}%'
			GROUP BY m.name
			ORDER BY m.orderid ASC
		`);
  }

  public async getSubmenu(user: any, menuId: any): Promise<any> {
    return this.db.query(`
			select s.id, s.name, s.description, s.icon, s.link, s.userrole
			from submenu s		
			where s.menuid = ${menuId} and s.showmenu = 1 and s.userrole LIKE '%${user.userRole}%'
			GROUP BY s.name
			ORDER BY s.orderid ASC
		`);
  }

  public async saveMenu(req: any): Promise<any> {
    let text = "";
    const fields: any = ["name", "description", "icon", "link"];
    Object.keys(req).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof req[key] === "string") {
          text += key + '="' + `${req[key]}` + '",';
        } else {
          text += key + "=" + `${req[key]}` + ",";
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
      return null;
    }
  }

  public async saveSubmenu(menuId: any, submenu: any): Promise<any> {
    let text = "";
    const fields: any = ["name", "description", "icon", "link"];
    Object.keys(submenu).map((key) => {
      if (fields.indexOf(key) > -1) {
        if (typeof submenu[key] === "string") {
          text += key + '="' + `${submenu[key]}` + '",';
        } else {
          text += key + "=" + `${submenu[key]}` + ",";
        }
      }
    });

    if (text && menuId) {
      text += ` updatedat = UTC_TIMESTAMP`;
      console.log(`
	  Update submenu
  SET
	  ${text}
  WHERE
	  id = ${menuId}
   `);

      return this.db.query(`
				Update submenu
			SET
				${text}
			WHERE
				id = ${menuId}
		 	`);
    } else {
      return null;
    }
  }
}

export default MenuService;
