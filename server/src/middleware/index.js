import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	//get user
	// routes.get('/', (req, res, next) => {
	// 	console.log(req);
	// 	console.log(res);
	// 	console.log(body);
	// 	// next();
	// 	res.send('yes');
	// });
	// add middleware here

	return routes;
}
