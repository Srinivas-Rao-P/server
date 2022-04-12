import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'manageuserroles#getUsers',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/manageuserroles/getUsers`
},{
	controller: 'manageuserroles#getUserroles',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/manageuserroles/getUserroles/:personId`
},{
	controller: 'manageuserroles#addUserrole',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/manageuserroles/addUserrole/:personId`
},{
	controller: 'manageuserroles#removeUserrole',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/manageuserroles/removeUserrole/:personId`
}
];

export default routes;