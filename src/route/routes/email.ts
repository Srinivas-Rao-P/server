import { ApiRoute, apiPrefix, RouteMethod } from './api';
import verifyToken from "../../middlewares/verifyToken";

const routes: ApiRoute[] = [{
    controller: 'email#sendEmail',
    method: RouteMethod.POST,
    middlewares: [
		verifyToken()
	],
    path: `${apiPrefix}/email/sendEmail`
}
];

export default routes;