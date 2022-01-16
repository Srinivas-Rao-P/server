import apiRoutes from './api';
import authRoutes from './auth';
import employeeRoutes from './employee';
import personRoutes from './person';
import menuRoutes from './menu';


export const routes = [
	...apiRoutes,
	...authRoutes,
	...employeeRoutes,
	...personRoutes,
	...menuRoutes,
];
