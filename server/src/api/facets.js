// import resource from 'resource-router-middleware';
import { Router } from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import facets from '../models/facets';

cloudinary.config({
  cloud_name: 'deathadders',
  api_key: '853331668234439',
  api_secret: 'ruY_T1b1plRwQtPMngBuomJIc0A'
});

const dest = 'images';
const upload = multer({dest: dest});

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.get('/user', (req,res) => {
		res.send('hello')
	});

	// Create new user
	api.post('/user-create', (req, res) => {
		console.log(req.body);
		res.send(req.body);
	});

	api.get('/user-check', (req, res) => {
		res.send(req.query.username);
	});

	api.post('/save-design', (req, res) => {
		res.send(req.body.design);
	});

	api.post('/image-upload', upload.single('image'), (req,res) => {
		cloudinary.uploader.upload(req.file.path, function(result) {
			res.send(result);
		});
	});

	api.get('user');

	return api;
};
