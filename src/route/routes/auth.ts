
import { ApiRoute, apiPrefix, RouteMethod } from './api';

const routes: ApiRoute[] = [{
    controller: 'auth#login',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/login`
}, {
    controller: 'auth#candidateLogin',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/candidateLogin`
}, {
    controller: 'auth#register',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/register`
}, {
    controller: 'auth#refreshToken',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/refreshToken`
}, {
    controller: 'auth#generateOtp',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/generateOtp`
}, {
    controller: 'auth#verifyOtp',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/verifyOtp`
}, {
    controller: 'auth#resetPassword',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/resetPassword`
},{
    controller: 'auth#logout',
    method: RouteMethod.POST,
    path: `${apiPrefix}/auth/logout`
}
];

export default routes;