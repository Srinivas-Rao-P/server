import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'menu#getMenuItems',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu`
}, {
	controller: 'menu#getSubMenu',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu/getSubMenu`
}, {
	controller: 'menu#addMainMenu',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu/addMainMenu`
}, {
	controller: 'menu#addSubMenu',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu/addSubMenu/:menuId`
}, {
	controller: 'menu#updateSubMenu',
	method: RouteMethod.PUT,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/menu/updateSubMenu/:menuId`
}
];

export default routes;