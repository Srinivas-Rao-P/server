import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
    controller: 'emergencycontact#addEmergencyContact',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/emergencycontact/addEmergencyContact/:personId`
},
{
    controller: 'emergencycontact#getEmergencyContactList',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/emergencycontact/getEmergencyContactList/:personId`
},
{
    controller: 'emergencycontact#getEmergencyContact',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/emergencycontact/getEmergencyContact/:emergencyContactId`
},
{
    controller: 'emergencycontact#updateEmergencyContact',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/emergencycontact/updateEmergencyContact/:personId`
},
{
    controller: 'emergencycontact#create',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/emergencycontact/create/:personId`
}
];

export default routes;