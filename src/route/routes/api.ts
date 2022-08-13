export const apiPrefix = '/api';

export enum RouteMethod {
	GET = 'get',
	PUT = 'put',
	POST = 'post',
	DELETE = 'delete'
}

export interface ApiRoute {
	method: RouteMethod;
	path: string;
	middlewares?: any[];
	controller: string;
}

const routes: ApiRoute[] = [{
	controller: 'health#check',
	method: RouteMethod.GET,
	path: `${apiPrefix}/health`
}];

export default routes;