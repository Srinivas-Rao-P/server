import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'menu#getMenu',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu`
}, {
	controller: 'menu#saveMenu',
	method: RouteMethod.PUT,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu/saveMenu/:menuId`
}
];

export default routes;