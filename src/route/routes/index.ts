import apiRoutes from './api';
import authRoutes from './auth';
import employeeRoutes from './employee';
import personRoutes from './person';
import menuRoutes from './menu';
import candidateRoutes from './candidate';
import emailRoutes from './email';
import bankRoutes from './bank';
import emergencycontactRoutes from './emergencycontact';

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
];
