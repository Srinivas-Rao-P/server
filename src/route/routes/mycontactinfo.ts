import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'mycontactinfo#getNames',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getNames/:personId`
},{
	controller: 'mycontactinfo#getAddress',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getAddress/:personId`
},{
	controller: 'mycontactinfo#getPhones',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getPhones/:personId`
},{
	controller: 'mycontactinfo#getEmails',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getEmails/:personId`
},
];

export default routes;