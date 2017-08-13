import { Router } from 'express';
import { version } from '../../package.json';
import imagenator from './imagenator';

export default ({ config, db }) => {
	let api = Router();

	// mount the imagenator resource
	api.use('/', imagenator({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
