
import { ApiRoute, apiPrefix, RouteMethod } from './api';

const routes: ApiRoute[] = [{
    controller: 'auth#login',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/login`
}, {
    controller: 'auth#register',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/register`
}, {
    controller: 'auth#refreshToken',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/refreshToken`
}, {
    controller: 'auth#logout',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/logout`
}
];

export default routes;