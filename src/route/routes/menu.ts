import { ApiRoute, apiPrefix, RouteMethod } from './api';
// import passport from 'passport';

const routes: ApiRoute[] = [{
	controller: 'menu#getMenuItems',
	method: RouteMethod.GET,
	// middlewares: [
	// 	passport.authenticate('bearer')
	// ],
	path: `${apiPrefix}/menu`
}
];

export default routes;