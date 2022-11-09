import apiRoutes from './api';
import authRoutes from './auth';
import employeeRoutes from './employee';
import personRoutes from './person';
import menuRoutes from './menu';
import candidateRoutes from './candidate';
import emailRoutes from './email';
import bankRoutes from './bank';
import emergencycontactRoutes from './emergencycontact';
import manageuserrolesRoutes from './manageuserroles';
import hireRoutes from './hire';
import mycontactinfoRoutes from './mycontactinfo';
import timeRoutes from './time';
import leaveRoutes from './leave';
import historyRoutes from './history';


export const routes = [
	...apiRoutes,
	...authRoutes,
	...employeeRoutes,
	...personRoutes,
	...menuRoutes,
	...candidateRoutes,
	...emailRoutes,
	...bankRoutes,
	...emergencycontactRoutes,
	...manageuserrolesRoutes,
	...hireRoutes,
	...mycontactinfoRoutes,
	...timeRoutes,
	...leaveRoutes,
	...historyRoutes,
];
