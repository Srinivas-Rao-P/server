import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
	controller: 'leave#getLeaveTypeList',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/leave/getLeaveTypeList`
},{
	controller: 'leave#getLeaveType',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/leave/getLeaveType/:leaveTypeId`
},{
	controller: 'leave#addLeaveType',
	method: RouteMethod.POST,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/leave/addLeaveType`
},{
	controller: 'leave#updateLeaveType',
	method: RouteMethod.PUT,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/leave/updateLeaveType/:leaveTypeId`
}
];

export default routes;