import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import router from './src/route/index';
import Database from './src/service/database/database';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import debugModule from 'debug';
// require('dotenv').config();
// import passport from 'passport';
// import session from 'express-session';
// import MysqlSession from 'express-mysql-session';
// // import PassportService from './src/service/authentication/passport';

// // import { logResponseTime } from './src/middleware/log_response_time';
// // import bugsnag from './bugsnag';

const debug = debugModule('api:application');
// // const passportService = new PassportService();
const app: express.Application = express();
const isProd = process.env.NODE_ENV === 'production';
// // tslint:disable-next-line:variable-name
// const MySQLStore = MysqlSession(session as any);


export default () => {

	// 	// setup bugsnag
	// 	// const bugsnagClient = bugsnag(configs.bugsnag);
	// 	// const bugsnagMiddleware = bugsnagClient.getPlugin('express');
	// 	// app.use(bugsnagMiddleware.requestHandler);

	// 	const sessionStore = new MySQLStore(configs.session.store, new Database().connection);
	// 	// app.use(logResponseTime());

	// 	/**
	// 	 * Attackers can use this header (which is enabled by default) to detect apps running Express
	// 	 * and then launch specifically-targeted attacks.
	// 	 * So, best practice is to to turn off the header with the app.disable() method:
	// 	 * @see https://expressjs.com/en/advanced/best-practice-security.html
	// 	 */
	app.disable('x-powered-by');
	app.use(helmet());
	// app.use(helmet.noCache());

	// 	// Add compression
	app.use(compression());

	// 	// Setup CORS. Which servers can call this application
	app.use(cors({
		credentials: true,
		optionsSuccessStatus: 200,
		origin: [
			'http://localhost:8082',
			'http://localhost:8080',
			'http://192.168.0.108:8080'
		]
	})
	);

	app.set('port', process.env.PORT || 8081);

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// app.use(cookieParser());

	// 	app.use(session({
	// 		cookie: configs.session.cookie,
	// 		name: configs.session.name,
	// 		resave: configs.session.resave,
	// 		rolling: configs.session.rolling,
	// 		saveUninitialized: configs.session.saveUninitialized,
	// 		secret: configs.session.secret,
	// 		store: sessionStore
	// 	}));

	// 	// configure passport
	// 	// passportService.loadStrategies();
	// 	app.use(passport.initialize());
	// 	app.use(passport.session());

	// 	// Register Routes
	app.use(router);

	// error handler
	app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (!err) {
			return next();
		}
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = !isProd ? err : {};

		// render the error page
		res.status(500);
		res.send({
			message: err.message,
			status: 'error',
			url: req.url
		});
	});

	process.on('uncaughtException', async (err) => {
		// debug(`${(new Date).toUTCString()} uncaughtException: ${err.message}`);
		// debug(err.stack);
		console.log(err);

		// Wait till we release database connection pool
		await new Database().closeConnection();

		// kill and let it restart clean
		process.exit(1);
	});

	// 	const setupProcessListeners = () => {
	// 		async function interruptHandler (event: string, restart: boolean = true, err: any): Promise<any> {
	// 			debug(`${(new Date).toUTCString()} ${event}: ${err.message}`);
	// 			debug(err.stack);
	// 			// bugsnagClient.notify(err);
	// 			if(restart) {
	// 				// Wait till we release database connection pool
	// 				await new Database().closeConnection();
	// 				// kill and let it restart clean
	// 				process.exit(1);
	// 			}
	// 		}
	// 		process.on('uncaughtException', interruptHandler.bind(this, 'uncaughtException'));
	// 		process.on('SIGBREAK', interruptHandler.bind(this, 'SIGBREAK'));
	// 		process.on('unhandledRejection', interruptHandler.bind(this, 'unhandledRejection', false));
	// 		process.on('exit', interruptHandler.bind(this, 'exit'));
	// 		process.on('SIGINT', interruptHandler.bind(this, 'SIGINT'));
	// 		process.on('SIGHUP', interruptHandler.bind(this, 'SIGHUP'));
	// 		process.on('SIGTERM', interruptHandler.bind(this, 'SIGTERM'));

	// 		return () => {
	// 			process.removeListener('uncaughtException', interruptHandler);
	// 			process.removeListener('unhandledRejection', interruptHandler);
	// 			process.removeListener('exit', interruptHandler);
	// 			process.removeListener('SIGINT', interruptHandler);
	// 			process.removeListener('SIGTERM', interruptHandler);
	// 			process.removeListener('SIGBREAK', interruptHandler);
	// 			process.removeListener('SIGHUP', interruptHandler);
	// 		};
	// 	}

	// 	const removeProcessListeners = setupProcessListeners();
	// 	removeProcessListeners();
	// 	setupProcessListeners();

	// 	// app.use(bugsnagMiddleware.errorHandler);

	app.listen(app.get('port'), () => {
		debug(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
		debug('Press CTRL-C/CMD-C to stop\n');
	});
}

// const morgan = require('morgan');


// require('dotenv').config();

// const middlewares = require('./src/middlewares');
// const app: express.Application = express();

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
// 	console.log(req);
// 	res.json({
// 		message: 'test'
// 	});
// });

// app.use('/api', require('./src/api'));

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// module.exports = app;