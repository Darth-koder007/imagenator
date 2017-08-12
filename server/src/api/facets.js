// import resource from 'resource-router-middleware';
import { Router } from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Fs from 'fs';
import facets from '../models/facets';

cloudinary.config({
  cloud_name: 'deathadders',
  api_key: '853331668234439',
  api_secret: 'ruY_T1b1plRwQtPMngBuomJIc0A'
});

const dest = 'images';
const upload = multer({dest: `${dest}`});

const getDefaultResponseObject = () =>
	JSON.parse(JSON.stringify({
		success: true,
		data: {},
		status: ""
	}));

export default ({ config, db }) => {
	let api = Router();

	// get user data
	api.get('/user-data', (req, res) => {
		let responseObject = getDefaultResponseObject();
		let selectQuery = `SELECT * FROM users where username = '${req.query.username}'`;
		let query = db.query(selectQuery, function (error, results, fields) {
  		if (error) {
				responseObject.success = false;
				responseObject.status = "DATA_NOT_FOUND_ERROR";

				return res.send(responseObject);
			}

			if (results && results.length > 0) {
				responseObject.data = JSON.parse(results[0].design_data);
				responseObject.status = "DATA_FOUND";
				return res.send(responseObject);
			}

			responseObject.success = false;
			responseObject.status = "DATA_NOT_FOUND";

			res.send(responseObject);
		});
	});

	// Create new user
	api.post('/user-create', (req, res) => {
		let responseObject = getDefaultResponseObject();
		let insertQuery = `INSERT INTO users (username) VALUES ('${req.body.username}')`;
		let query = db.query(insertQuery, function (error, results, fields) {
			if (error) {
				responseObject.success = false;
				responseObject.status = "USER_CREATE_FAIL_ERROR";

				return res.send(responseObject);
			}

			responseObject.status = "USER_CREATED";
			return res.send(responseObject);
		});
	});

	// User check in DB
	api.get('/user-check', (req, res) => {
		let responseObject = getDefaultResponseObject();
		let selectQuery = `SELECT * FROM users where username = '${req.query.username}'`;
		let query = db.query(selectQuery, function (error, results, fields) {
			if (error) {
				responseObject.success = false;
				responseObject.status = "USER_CHECK_FAIL_ERROR";

				return res.send(responseObject);
			}

			if (results && results.length > 0) {
				responseObject.status = "USER_CHECKED";
				return res.send(responseObject);
			}

			responseObject.success = false;
			responseObject.status = "USER_NOT_FOUND";
			res.send(responseObject);
		});
	});

	// Save, create and delete design in DB
	api.post('/save-design', (req, res) => {
		let responseObject = getDefaultResponseObject();

		let insertQuery = `INSERT INTO users
											(username, design_data)
											VALUES('${req.body.username}', '${JSON.stringify(req.body.design)}')
											ON DUPLICATE KEY UPDATE
											design_data = '${JSON.stringify(req.body.design)}'`;
		let updateQuery = `UPDATE users SET design_data = '${JSON.stringify(req.body.design)}' WHERE username = '${req.body.username}'`;

		let query = db.query(updateQuery, function (error, results, fields) {
			if (error) {
				responseObject.success = false;
				responseObject.status = "DESIGN_SAVE_FAIL_ERROR";

				return res.send(responseObject);
			}

			if (results && results.affectedRows > 0) {
				responseObject.status = "DESIGN_SAVED";

				return res.send(responseObject);
			}

			responseObject.success = false;
			responseObject.status = "DESIGN_NOT_SAVED";

			res.send(responseObject);
		});
	});

	// Upload Image to cloudinary cdn
	api.post('/image-upload', upload.single('image'), (req,res) => {
		let responseObject = getDefaultResponseObject();

		if (!req.file) {
			responseObject.status = "IMAGE_INVALID";
			responseObject.success = false;

			return res.send(responseObject);
		}

		cloudinary.uploader.upload(req.file.path, function(result) {
			// House keeping
			if (!Fs.existsSync(dest)) {
			  Fs.mkdirSync(dest);
			} else {
			  Fs.readdirSync(dest).forEach(function (fileName) {
		      Fs.unlinkSync(dest + '/' + fileName);
			 });
		 	}
			
			if (result.secure_url) {
				responseObject.data.img_url = result.secure_url;
				responseObject.status = "IMAGE_UPLOADED";
				return res.send(responseObject);
			}

			responseObject.status = "IMAGE_UPLOAD_FAILED";
			responseObject.success = false;
			res.send(responseObject);
		});
	});

	return api;
};
