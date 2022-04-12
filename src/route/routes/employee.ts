import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'employee#getEmployeesListByCompany',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/employee/getEmployeesListByCompany`
},
{
	controller: 'employee#getEmployee',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/employee/getEmployee`
}, {
	controller: 'employee#manageEmployee',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/employee/manageEmployee/:managerId`
},
];

export default routes;