// import resource from 'resource-router-middleware';
import facets from '../models/facets';
import { Router } from 'express';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.get('/', (req,res) => res.send('hello'));

	return api;
};
