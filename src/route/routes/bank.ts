import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
    controller: 'bank#addBank',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/bank/addBank/:personId`
}, {
    controller: 'bank#updateBank',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/bank/updateBank/:personId`
}, {
    controller: 'bank#getBankList',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/bank/getBankList/:personId/:showDeletedRecords`
},
{
    controller: 'bank#getBankData',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/bank/getBankData/:bankId`
},
{
    controller: 'bank#validateAccountNumber',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/bank/validateAccountNumber/:accountnumber`
},
{
    controller: 'bank#create',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/bank/create/:personId`
}
];

export default routes;