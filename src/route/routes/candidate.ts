import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
    controller: 'candidate#addCandidate',
    method: RouteMethod.POST,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/candidate/addCandidate`
}, {
    controller: 'candidate#updateCandidate',
    method: RouteMethod.PUT,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/candidate/updateCandidate`
}, {
    controller: 'candidate#getCandidateList',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/candidate/getCandidateList`
},
{
    controller: 'candidate#getCandidateData',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/candidate/getCandidateData/:candidateId`
},
{
    controller: 'candidate#create',
    method: RouteMethod.GET,
    middlewares: [
        verifyToken()
    ],
    path: `${apiPrefix}/candidate/create`
}
];

export default routes;