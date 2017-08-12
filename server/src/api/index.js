import { Router } from 'express';
import { version } from '../../package.json';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	// api.use('/vijay', facets({ config, db }).Router);
	// console.log(facets({ config, db }).Router);
	// api.use(facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
