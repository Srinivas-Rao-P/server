import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'person#getProfile',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/person/getProfile/:personId`
},{
	controller: 'person#saveProfile',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/person/saveProfile/:personId`
},{
	controller: 'person#getPersonInfo',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/person/getPersonInfo/:personId`
},
];

export default routes;