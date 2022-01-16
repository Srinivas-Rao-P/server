import { ApiRoute, apiPrefix, RouteMethod } from './api';
// import passport from 'passport';

const routes: ApiRoute[] = [{
	controller: 'activitylog#getActivityLog',
	method: RouteMethod.POST,
	// middlewares: [
	// 	passport.authenticate('bearer')
	// ],
	path: `${apiPrefix}/activitylog/getActivityLog`
}
];

export default routes;
