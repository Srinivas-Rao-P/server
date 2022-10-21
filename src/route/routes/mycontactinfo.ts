import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
    controller: 'mycontactinfo#addName',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/addName/:personId`
},{
    controller: 'mycontactinfo#updateName',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/updateName/:personId`
},{
	controller: 'mycontactinfo#createName',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/createName/:personId`
},{
	controller: 'mycontactinfo#getName',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getName/:phoneId`
},{
	controller: 'mycontactinfo#getNameList',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getNameList/:personId/:showDeletedRecords`
},{
    controller: 'mycontactinfo#addAddress',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/addAddress/:personId`
},{
    controller: 'mycontactinfo#updateAddress',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/updateAddress/:personId`
},{
	controller: 'mycontactinfo#createAddress',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/createAddress/:personId`
},{
	controller: 'mycontactinfo#getAddress',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getAddress/:phoneId`
},{
	controller: 'mycontactinfo#getAddressList',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getAddressList/:personId/:showDeletedRecords`
},


{
    controller: 'mycontactinfo#addPhone',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/addPhone/:personId`
},{
    controller: 'mycontactinfo#updatePhone',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/updatePhone/:personId`
},{
	controller: 'mycontactinfo#createPhone',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/createPhone/:personId`
},{
	controller: 'mycontactinfo#getPhoneContact',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getPhoneContact/:phoneId`
},{
	controller: 'mycontactinfo#getPhoneList',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getPhoneList/:personId/:showDeletedRecords`
},

{
	controller: 'mycontactinfo#getEmail',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getEmail/:emailId`
},{
    controller: 'mycontactinfo#addEmail',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/addEmail/:personId`
},{
    controller: 'mycontactinfo#updateEmail',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/mycontactinfo/updateEmail/:personId`
},{
	controller: 'mycontactinfo#createEmail',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/createEmail/:personId`
},{
	controller: 'mycontactinfo#getEmailContact',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getEmailContact/:phoneId`
},{
	controller: 'mycontactinfo#getEmailList',
	method: RouteMethod.GET,
	middlewares: [
		verifyToken()
	],
	path: `${apiPrefix}/mycontactinfo/getEmailList/:personId/:showDeletedRecords`
},
];

export default routes;