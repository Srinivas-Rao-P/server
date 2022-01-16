import { ApiRoute, apiPrefix, RouteMethod } from './api';
// import passport from 'passport';

const routes: ApiRoute[] = [{
	controller: 'employee#getEmployeesListByCompany',
	method: RouteMethod.POST,
	// middlewares: [
	// 	passport.authenticate('bearer')
	// ],
	path: `${apiPrefix}/employee/getEmployeesListByCompany`
},
{
	controller: 'employee#getEmployee',
	method: RouteMethod.GET,
	// middlewares: [
	// 	passport.authenticate('bearer')
	// ],
	path: `${apiPrefix}/employee/getEmployee`
}
];

export default routes;