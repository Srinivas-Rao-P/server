import { ApiRoute, apiPrefix, RouteMethod } from './api';

const routes: ApiRoute[] = [{
	controller: 'person#getProfile',
	method: RouteMethod.GET,
	// middlewares: [
	// 	passport.authenticate('bearer')
	// ],
	path: `${apiPrefix}/person/getProfile/:personId`
},{
	controller: 'person#saveProfile',
	method: RouteMethod.POST,
	// middlewares: [
	// 	passport.authenticate('bearer')
	// ],
	path: `${apiPrefix}/person/saveProfile/:personId`
},
];

export default routes;