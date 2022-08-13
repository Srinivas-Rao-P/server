import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'history#deleteRecord',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/history/deleteRecord`
}, {
	controller: 'history#getHistory',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/history/getHistory`
}
];

export default routes;